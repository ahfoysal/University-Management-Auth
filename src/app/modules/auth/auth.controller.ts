import { Request, Response } from 'express'
import { RequestHandler } from 'express-serve-static-core'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { IUser } from '../user/user.interface'
import { AuthService } from './auth.service'

const login: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body
    const result = await AuthService.login(data)

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student created successfully!',
      data: result,
    })
  },
)

export const AuthController = {
  login,
}
