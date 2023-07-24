import { Request, Response } from 'express'
import { RequestHandler } from 'express-serve-static-core'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { IUser } from '../user/user.interface'

const login: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body
    // const result = await User

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student created successfully!',
      data: data,
    })
  },
)

export const AuthController = {
  login,
}
