import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import userService from './app/modules/users/user.service'

const app: Application = express()

///cors
app.use(cors())

///body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', async (req: Request, res: Response) => {
  await userService.createUser({
    id: '999',
    password: 'password',
    role: 'student',
  })
  res.send('Server Running')
})

export default app
