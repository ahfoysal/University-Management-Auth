import { ZodError } from 'zod'
import { IGenericErrorResponse } from '../interfaces/common'

const handleZodError = (err: ZodError) => {
  //   const errors: IGenericErrorMessage[] = Object.values(err.errors).map(
  //     (el: ZodError) => {
  //       return {
  //         path: el?.path,
  //         message: el?.message,
  //       }
  //     },
  //   )
  //   const statusCode = 400
  //   return {
  //     statusCode,
  //     message: 'Validation Error (Zod)',
  //     errorMessages: errors,
  //   }
  console.log(err, 'zod error')
}

export default handleZodError
