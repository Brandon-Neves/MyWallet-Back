import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'
dotenv.config()

const mongoCLient = new MongoClient(process.env.MONGO_URI)

let db

try {
  await mongoCLient.connect()
  db = mongoCLient.db()
} catch (err) {
  console.log(err)
}

export default db
