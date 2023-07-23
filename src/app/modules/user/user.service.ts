import config from '../../../config'
import ApiError from '../../../errors/ApiError'
import { IUser } from './user.interface'
import { User } from './user.model'
import { generatedFacultyId, generatedStudentId } from './user.utils'

const createUser = async (user: IUser): Promise<IUser | null> => {
  //  Auto generated  incremental id
  const sems = {
    year: '2036',
    code: '02',
  }
  if (user.role === 'student') {
    const id = await generatedStudentId(sems)
    user.id = id
  } else if (user.role === 'faculty') {
    const faculty = await generatedFacultyId(sems)
    user.id = faculty
  }
  if (!user.password) {
    user.password = config.default_user_password as string
  }
  const createdUser = await User.create(user)
  if (!createdUser) {
    throw new ApiError(400, 'Failed to create user!')
  }
  return createdUser
}

export const userService = {
  createUser,
}
