import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'
import db from '../database/database.js'

export async function signUp(req, res) {
  
  const newUser = res.locals.user
  const passwordHashed = bcrypt.hashSync(newUser.password, 10)

  try {
    await db
      .collection('users')
      .insertOne({ ...newUser, password: passwordHashed })
    res.sendStatus(201)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}
export async function login(req, res) {
  const token = uuid()

  const user = res.locals.user
  console.log(user)

  try {
      await db.collection('sessions').insertOne({
        userId: user._id,
        token
      })
      res.send({ token })
  } catch (err) {
    console.log(err)
    return res.status(500).send(err)
  }
}
