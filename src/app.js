import cors from 'cors'
import express from 'express'
import transactionRouter from './routes/TransactionsRouters.js'
import authRouter from './routes/AuthRouter.js'


const app = express()
app.use(cors())
app.use(express.json())

app.use([authRouter, transactionRouter])

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Servidor funcionando na porta ${port}`)
})
