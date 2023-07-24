import { Model, Types } from 'mongoose'
import { IStudent } from '../student/student.interface'

export type IUser = {
  id: string
  role: string
  password: string
  student?: Types.ObjectId | IStudent
  admin?: Types.ObjectId | IAdmin
  faculty: Types.ObjectId | IFaculty
  needPasswordChange: true | false
}
export type IAdmin = {
  id: string
  role: string
  password: string
}
export type IFaculty = {
  id: string
}

export type UserModel = Model<IUser, Record<string, unknown>>
