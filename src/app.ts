import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import userRouter from './app/modules/users/user.route'

const app: Application = express()

///cors
app.use(cors())
console.log(app.get('env'))
///body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
////////
app.use('/api/v1/users', userRouter)
///////
app.get('/', async (req: Request, res: Response) => {
  return res.send('Server Running')
})

export default app
