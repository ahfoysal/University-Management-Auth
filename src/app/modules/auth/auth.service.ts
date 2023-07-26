import httpStatus from 'http-status'
import { JwtPayload, Secret } from 'jsonwebtoken'
import config from '../../../config'
import ApiError from '../../../errors/ApiError'
import { jwtHelpers } from '../../../helpers/jwtHelper'
import { User } from '../user/user.model'
import {
  IChangePassword,
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
const changePassword = async (
  user: JwtPayload | null,
  payload: IChangePassword,
): Promise<void> => {
  const { oldPassword, newPassword } = payload

  // // checking is user exist
  // const isUserExist = await User.isUserExist(user?.userId);

  //alternative way
  const isUserExist = await User.findOne({ id: user?.userId }).select(
    '+password',
  )

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }

  // checking old password
  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(oldPassword, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Old Password is incorrect')
  }

  // // hash password before saving
  // const newHashedPassword = await bcrypt.hash(
  //   newPassword,
  //   Number(config.bycrypt_salt_rounds)
  // );

  // const query = { id: user?.userId };
  // const updatedData = {
  //   password: newHashedPassword,  //
  //   needsPasswordChange: false,
  //   passwordChangedAt: new Date(), //
  // };

  // await User.findOneAndUpdate(query, updatedData);
  // data update
  isUserExist.password = newPassword
  isUserExist.needsPasswordChange = false

  // updating using save()
  isUserExist.save()
}
export const AuthService = {
  login,
  refreshToken,
  changePassword,
}
