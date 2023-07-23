import cors from 'cors'
import express, { Application } from 'express'
import globalErrorHandler from './app/middlewares/globalErrorHandlers'
import { generatedFacultyId } from './app/modules/user/user.utils'
import routes from './app/routes'

const app: Application = express()

///cors
app.use(cors())

///body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
////////
app.use('/api/v1', routes)
app.use(globalErrorHandler)

///////

// Testing
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   throw new ApiError(400, 'Invalid Request')
//   // Promise.reject(new Error('Unhandled Promise Rejection'))
//   // return res.send('Server Running')
// })

const test = async () => {
  const testId = await generatedFacultyId()
  console.log(testId)
}
// test()

export default app
