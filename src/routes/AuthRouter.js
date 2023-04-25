import express  from 'express'
import { signUp, login } from '../controller/AuthController.js'
import {userSchemaValidate, loginSchemaVadalite} from '../middlewares/auth.validateSchema.js'


const authRouter = express.Router()

authRouter.post("/cadastrar", userSchemaValidate,signUp)
authRouter.post("/login", loginSchemaVadalite,login)

export default authRouter
