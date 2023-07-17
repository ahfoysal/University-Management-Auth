import express, { Application, Request, Response } from 'express'
import cors from 'cors'
// import { User } from "./modules/user/user.model";

const app: Application = express()

///cors
app.use(cors())

///body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
  //insert a data

  res.send('Server Running')
  // from new branch
  // next()
})

export default app
