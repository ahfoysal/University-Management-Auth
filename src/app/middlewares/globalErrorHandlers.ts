import { NextFunction, Request, Response } from 'express'

const globalErrorHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  type IGenericErrorMessage = {
    path: string
    message: string
  }
  let statusCode = 500
  let message = 'Something went wrong'
  let errorMessages: IGenericErrorMessage[] = []
  res.status(400).json({
    error: err,
    message: 'Global Error',
    success: false,
  })
  next()
}
export default globalErrorHandler
