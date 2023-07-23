import { Request, Response } from 'express'
import httpstatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { userService } from './user.service'
const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.body
  const result = await userService.createUser(user)

  sendResponse(res, {
    statusCode: httpstatus.OK,
    success: true,
    message: 'user created successfully',
    data: result,
  })
})
export const userController = { createUser }
