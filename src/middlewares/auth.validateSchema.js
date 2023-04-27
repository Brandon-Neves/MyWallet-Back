import db from '../database/database.js'
import { userDataSchema } from '../model/AuthSchema.js'
import bcrypt from 'bcrypt'

export async function userSchemaValidate(req, res, next) {
  const user = req.body
  const { err } = userDataSchema.validate(user, { abortEarly: false })

  if (err) {
    const errosMessages = err.details.map(dt => dt.message)
    return res.status(400).send(errosMessages)
  }

  const userExist = await db.collection('users').findOne({ email: user.email })
  if (userExist) return res.status(409).send('Usuário já existe')
  res.locals.user = user
  next()
}

export async function loginSchemaVadalite(req, res, next) {
  const { password, email } = req.body

  try {
    const user = await db.collection('users').findOne({ email })
    if (!user) return res.status(401).send('Você não tem autorização')
    const passwordIsCorrect = bcrypt.compareSync(password, user.password)
    if (!passwordIsCorrect)
      return res.status(401).send('Você não tem autorização')
    res.locals.user = user
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
  next()
}

export async function authRoutesValidate(req, res, next) {
  const { authorization } = req.headers
  const token = authorization?.replace('Bearer ', '')

  if (!token) return res.status(401).send('Você não tem autoriação')
  try {
    const sessions = await db.collection('sessions').findOne({ token })
    if (!sessions) return res.status(401).send('Você não tem autoriação')

    const user = await db.collection('users').findOne({ _id: sessions.userId })
    if (!user) return res.status(401).send('Você não tem autoriação')
    res.locals.user = user
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
  next()
}
