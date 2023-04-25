import {transactionsSchema} from '../model/TransactionsSchema.js'
import dayjs from 'dayjs'

export default function transactionsSchemaValidate(req, res, next) {
  const user = res.locals.user
  const {type, value, description} = req.body

  const userTransaction = {
    value,
    description,
    type,
    user: user._id,
    cretedAt: dayjs().format('DD/MM/YYYY')
  }

  const {err} = transactionsSchema.validate(userTransaction, {abortEarly: false})

  if(err) {
    const errMessages = err.datails.map(dt => dt.message)
    return res.status(400).send(errMessages)
  }
  res.locals.transaction = userTransaction
  next()
}