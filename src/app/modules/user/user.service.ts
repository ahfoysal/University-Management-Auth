import config from '../../../config'
import ApiError from '../../../errors/ApiError'
import { IStudent } from '../student/student.interface'
import { IUser } from './user.interface'
import { User } from './user.model'

const createStudent = async (
  student: IStudent,
  user: IUser,
): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.default_student_password as string
  }
  const createdUser = await User.create(user)
  if (!createdUser) {
    throw new ApiError(400, 'Failed to create student!')
  }
  return createdUser
}
export const UserService = {
  createStudent,
}
