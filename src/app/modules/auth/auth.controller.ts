import { Request, Response } from 'express'
import { RequestHandler } from 'express-serve-static-core'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { ILoginUserResponse } from './auth.interface'
import { AuthService } from './auth.service'
import config from '../../../config'

const login: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body
    const result = await AuthService.login(data)
    // Refresh token as cookie
    const { refreshToken, ...others } = result
    const cookieOptions = {
      secure: (config.env === 'production') === true,
      httpOnly: true,
    }
    res.cookie('refreshToken', refreshToken, cookieOptions)
    // Delete
    sendResponse<ILoginUserResponse>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User logged in successfully!',
      data: others,
    })
  },
)

export const AuthController = {
  login,
}
