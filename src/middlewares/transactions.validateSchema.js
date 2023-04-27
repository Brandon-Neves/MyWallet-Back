import { transactionsSchema } from '../model/TransactionsSchema.js'
import dayjs from 'dayjs'

export default function transactionsSchemaValidate(req, res, next) {
  const { type, value, description } = req.body
  let userid = res.locals.user._id

  const userTransaction = {
    value,
    description,
    type,
    user: userid,
    cretedAt: dayjs().format('DD/MM/YYYY')
  }

  const { error } = transactionsSchema.validate(userTransaction, {
    abortEarly: false
  })

  if (error) {
    const errMessages = error.details.map(detail => detail.message)
    return res.status(422).send(errMessages)
  }
  res.locals.transaction = userTransaction
  next()
}
