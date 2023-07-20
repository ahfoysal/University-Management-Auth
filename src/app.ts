import cors from 'cors'
import express, { Application, NextFunction, Request, Response } from 'express'
import globalErrorHandler from './app/middlewares/globalErrorHandlers'
import { userRoutes } from './app/modules/users/user.route'

const app: Application = express()

///cors
app.use(cors())

///body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
////////
app.use('/api/v1/users', userRoutes)
app.use(globalErrorHandler)

///////

// Testing
app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  // throw new ApiError(400, 'Invalid Request')
  Promise.reject(new Error('Unhandled Promise Rejection'))
  // return res.send('Server Running')
})

export default app
