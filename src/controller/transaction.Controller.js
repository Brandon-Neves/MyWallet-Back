import db from '../database/database.js'
import dayjs from 'dayjs'

export async function newTransaction(req, res) {
  const transaction = res.locals.transaction
  console.log(transaction)
  try {
    await db.collection('transactions').insertOne(transaction)
    res.status(201).send('Transação registrada com sucesso')
  } catch (err) {
    console.log(err)
    res.status(500).send(err.message)
  }
}

export async function getTransactions(req, res) {
  const user = res.locals.user
  console.log(user)

  try {
    const transactions = await db
      .collection('transactions')
      .find({ user: user.id })
      .toArray()
    delete user.password
    res.send({ transactions, user })
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}
