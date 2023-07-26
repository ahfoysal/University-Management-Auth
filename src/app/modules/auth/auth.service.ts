import httpStatus from 'http-status'
import { Secret } from 'jsonwebtoken'
import config from '../../../config'
import ApiError from '../../../errors/ApiError'
import { jwtHelpers } from '../../../helpers/jwtHelper'
import { User } from '../user/user.model'
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface'

const login = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload

  // check user exists

  const isUserExist = await User.isUserExist(id)
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }

  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect')
  }

  // generate access  token
  const { id: userId, role, needsPasswordChange } = isUserExist
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
  return { accessToken, refreshToken, needsPasswordChange }
}

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  // verify the token
  let decodedToken = null
  try {
    decodedToken = jwtHelpers.verifyToken(token, config.jwt.refresh as Secret)
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token')
  }
  const { id } = decodedToken
  const isUserExist = await User.isUserExist(id)
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }
  // generate new access token
  const accessToken = jwtHelpers.generateToken(
    { id: id, role: isUserExist.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  )
  return { accessToken }
}
export const AuthService = {
  login,
  refreshToken,
}
