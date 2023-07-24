import httpStatus from 'http-status'
import { Secret } from 'jsonwebtoken'
import config from '../../../config'
import ApiError from '../../../errors/ApiError'
import { jwtHelpers } from '../../../helpers/jwtHelper'
import { User } from '../user/user.model'
import { ILoginUser, ILoginUserResponse } from './auth.interface'

const login = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload

  // check user exists

  const user = new User()
  const isUserExist = await user.isUserExist(id)
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }

  if (
    isUserExist.password &&
    !(await user.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect')
  }

  // generate access  token
  const { id: userId, role, needPasswordChange } = isUserExist
  const accessToken = jwtHelpers.generateToken(
    { id: userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  )
  const refreshToken = jwtHelpers.generateToken(
    { id: userId, role },
    config.jwt.refresh as Secret,
    config.jwt.refresh_expire_in as string,
  )
  return { accessToken, refreshToken, needPasswordChange }
}

export const AuthService = {
  login,
}
