import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const uri = process.env.MONGO_URI
if (!uri) {
  console.error('MONGO_URI not set in .env')
  process.exit(1)
}

async function test() {
  console.log('Testing MongoDB connection to', uri.split('@').pop?.() || uri)
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 })
    console.log('Connected successfully')
    const admin = mongoose.connection.db.admin()
    const info = await admin.serverStatus().catch(()=>null)
    console.log('Server status info fetched:', !!info)
  } catch (err) {
    console.error('Connection failed:', err)
  } finally {
    await mongoose.disconnect()
  }
}

test()
