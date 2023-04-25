import db from "../database/database.js";

export async function newTransaction(req, res) {
  const transaction = res.locals.transaction
  try {
    await db.collection('transactions').insertOne(transaction)
    res.SendStatus(201)
  } catch (err) {
    console.log(err)
    res.SendStatus(500)
  }
}

export async function getTransactions(req, res) {
  const user = res.locals.user

  try {
    const transactions = await db.collection('transactions').find({user:user.id}).toArray()
    delete user.password
    res.send({transactions, user})
  } catch (err) {
    console.log(err)
    res.SendStatus(500)
  }
}