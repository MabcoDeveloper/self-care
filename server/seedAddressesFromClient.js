import fs from 'fs'
import path from 'path'
import vm from 'vm'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const MONGO_URI = process.env.MONGO_URI
if (!MONGO_URI) {
  console.error('MONGO_URI not set in .env. Aborting.')
  process.exit(1)
}

const dataPath = path.resolve(process.cwd(), '..', 'client', 'src', 'assets', 'data.js')
if (!fs.existsSync(dataPath)) {
  console.error('client data file not found at', dataPath)
  process.exit(1)
}

const raw = fs.readFileSync(dataPath, 'utf8')

// Locate the export for dummyAddress
const marker = 'export const dummyAddress'
const idx = raw.indexOf(marker)
if (idx === -1) {
  console.error('Could not find "export const dummyAddress" in data.js')
  process.exit(1)
}

// Find the = and the opening [
const eq = raw.indexOf('=', idx)
const arrStart = raw.indexOf('[', eq)
if (arrStart === -1) {
  console.error('Could not find start of address array')
  process.exit(1)
}

// Find matching closing bracket for the array (simple bracket matcher)
let depth = 0
let arrEnd = -1
for (let i = arrStart; i < raw.length; i++) {
  const ch = raw[i]
  if (ch === '[') depth++
  else if (ch === ']') {
    depth--
    if (depth === 0) { arrEnd = i; break }
  }
}

if (arrEnd === -1) {
  console.error('Could not locate end of address array')
  process.exit(1)
}

const arrayText = raw.slice(arrStart, arrEnd + 1)

let addresses
try {
  // Evaluate safely in a VM to get JS objects
  const script = new vm.Script('result = ' + arrayText)
  const ctx = vm.createContext({})
  script.runInContext(ctx)
  addresses = ctx.result
} catch (err) {
  console.error('Failed to evaluate address array:', err)
  process.exit(1)
}

if (!Array.isArray(addresses)) {
  console.error('Evaluated value is not an array')
  process.exit(1)
}

// Clean addresses: ensure zipcode is string; remove invalid _id values; remove any *_ar fields; fill required fields
const cleaned = addresses.map(a => {
  const copy = { ...a }
  if (copy.zipcode !== undefined && copy.zipcode !== null) copy.zipcode = String(copy.zipcode)
  // remove arabic fields if present
  Object.keys(copy).forEach(k => { if (k.endsWith('_ar')) delete copy[k] })
  // validate _id
  if (copy._id === undefined || !/^[0-9a-fA-F]{24}$/.test(String(copy._id))) delete copy._id

  // Ensure required fields exist (use empty string when missing)
  const required = ['userId','firstName','lastName','email','street','city','state','country','zipcode','phone']
  required.forEach(f => { if (!copy[f]) copy[f] = 'N/A' })

  return copy
})

// Import Address model after reading file
const { default: Address } = await import('./models/Address.js')

async function run() {
  await mongoose.connect(MONGO_URI)
  console.log('Connected to MongoDB — seeding addresses')

  // Replace existing addresses
  const before = await Address.countDocuments()
  console.log(`Existing addresses: ${before}`)

  if (cleaned.length === 0) {
    console.log('No addresses found to insert. Exiting.')
    await mongoose.disconnect()
    return
  }

  await Address.deleteMany({})
  const inserted = await Address.insertMany(cleaned)
  console.log(`Inserted ${inserted.length} addresses`)

  await mongoose.disconnect()
  console.log('Disconnected — seeding complete')
}

run().catch(err => { console.error('Seeding error:', err); process.exit(1) })
