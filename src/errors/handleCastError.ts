import mongoose from 'mongoose'
import { IGenericErrorResponse } from '../interfaces/common'

const handleCastError = (
  err: mongoose.Error.CastError,
): IGenericErrorResponse => {
  //   const errors: IGenericErrorMessage[] = Object.values(err.errors).map(
  //     (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
  //       return {
  //         path: el?.path,
  //         message: el?.message,
  //       }
  //     },
  //   )
  const statusCode = 400
  console.log(err, 'error')
  return {
    statusCode,
    message: 'cast Error',
    errorMessages: [{ message: 'cast error', path: '' }],
  }
}

export default handleCastError
