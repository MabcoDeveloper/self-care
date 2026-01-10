import mongoose from 'mongoose'
import dotenv from 'dotenv'
import fs from 'fs'

dotenv.config()

const MONGO_URI = process.env.MONGO_URI
if (!MONGO_URI) {
  console.error('MONGO_URI not set in environment. Aborting.')
  process.exit(1)
}

// Dynamic import to avoid startup ordering issues
const { default: Address } = await import('./models/Address.js')

async function migrate() {
  await mongoose.connect(MONGO_URI)
  console.log('Connected to MongoDB for address migration')

  const addresses = await Address.find({}).lean()
  console.log(`Found ${addresses.length} addresses to process`)

  let updated = 0

  for (const a of addresses) {
    const unset = {}
    Object.keys(a).forEach(key => {
      if (key.endsWith('_ar')) unset[key] = ''
    })

    const update = {}
    // Ensure zipcode is a string
    if (a.zipcode !== undefined && a.zipcode !== null) update.zipcode = String(a.zipcode)
    else update.zipcode = ''

    // Ensure required fields exist (fill empty string if missing)
    const required = ['userId','firstName','lastName','email','street','city','state','country','phone']
    required.forEach(f => {
      if (a[f] === undefined || a[f] === null) update[f] = ''
    })

    // Remove any stray Arabic fields and set normalized fields
    await Address.updateOne({ _id: a._id }, { $set: update, $unset: unset })
    updated++
  }

  console.log(`Updated ${updated} address documents`)
  await mongoose.disconnect()
  console.log('Disconnected — migration complete')
}

migrate().catch(err => {
  console.error('Migration error:', err)
  process.exit(1)
})
