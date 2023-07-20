import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import globalErrorHandler from './app/middlewares/globalErrorHandlers'
import userRouter from './app/modules/users/user.route'

const app: Application = express()

///cors
app.use(cors())

///body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
////////
app.use('/api/v1/users', userRouter)
///////

app.get('/', async (req: Request, res: Response) => {
  // throw new ApiError(400, 'heda')
  // next('ore heda')
  return res.send('Server Running')
})

app.use(globalErrorHandler)
export default app
