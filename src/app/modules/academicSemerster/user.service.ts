import config from '../../../config'
import ApiError from '../../../errors/ApiError'
import { IUser } from './academicSemester.interface'
import { User } from './academicSemester.model'
import { generatedUserId } from './user.utils'

const createUser = async (user: IUser): Promise<IUser | null> => {
  //  Auto generated  incremental id
  const id = await generatedUserId()
  user.id = id
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
