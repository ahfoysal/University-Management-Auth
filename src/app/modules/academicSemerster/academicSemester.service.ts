import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { academicSemesterTitleCodeMapper } from './academicSemester.constant'
import { IAcademicSemester } from './academicSemester.interface'
import { AcademicSemester } from './academicSemester.model'

const createSemester = async (
  payload: IAcademicSemester,
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.create(payload)
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester Code')
  }
  return result
}

const getSemesters = async (pagination: IPaginationOptions) => {
  const { page = 1, limit = 10 } = pagination
  const skip = (page - 1) * limit
  const result = await AcademicSemester.find().sort().skip(skip).limit(limit)
  const total = await AcademicSemester.count()
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

export const academicSemesterService = {
  createSemester,
  getSemesters,
}
