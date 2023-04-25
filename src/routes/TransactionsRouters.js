import { Router } from 'express'
import {authRoutesValidate} from '../middlewares/auth.validateSchema.js'
import transactionsSchemaValidate from '../middlewares/transactions.validateSchema.js'
import {newTransaction, getTransactions} from '../controller/transaction.Controller.js'
const transactionRouter = Router()

transactionRouter.use(authRoutesValidate)

transactionRouter.post('/transacoes', transactionsSchemaValidate, newTransaction)
transactionRouter.get('/transacoes', getTransactions)

export default transactionRouter
