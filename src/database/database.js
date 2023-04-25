import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'
dotenv.config()

const mongoCLient = new MongoClient('mongodb://127.0.0.1:27017/mywallet')

let db

try {
  await mongoCLient.connect()
  db = mongoCLient.db()
} catch (err) {
  console.log(err)
}

export default db
