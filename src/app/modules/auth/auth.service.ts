import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { User } from '../user/user.model'
import { ILoginUser } from './auth.interface'
import bcrypt from 'bcrypt'

const login = async (payload: ILoginUser) => {
  const { id, password } = payload
  // check user exists
  const isUserExist = await User.findOne(
    { id },
    { id: 1, password: 1, needPasswordChange: 1 },
  ).lean()
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }

  const isPasswordMatched = await bcrypt.compare(password, isUserExist.password)
  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect')
  }
}

export const AuthService = {
  login,
}
