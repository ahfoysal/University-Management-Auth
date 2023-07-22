import { Request, Response } from 'express'
import httpstatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { paginationFields } from '../../constants/pagination'
import { academicSemesterFilterableFields } from './academicSemester.constant'
import { IAcademicSemester } from './academicSemester.interface'
import { academicSemesterService } from './academicSemester.service'

const createSemester = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body
  const result = await academicSemesterService.createSemester(data)

  sendResponse<IAcademicSemester>(res, {
    statusCode: httpstatus.OK,
    success: true,
    message: 'Academic semester created successfully',
    data: result,
  })
})
const getSemesters = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields)
  const filters = pick(req.query, academicSemesterFilterableFields)
  const result = await academicSemesterService.getSemesters(
    filters,
    paginationOptions,
  )

  sendResponse<IAcademicSemester[]>(res, {
    statusCode: httpstatus.OK,
    success: true,
    message: 'Academic semesters fetched successfully',
    meta: result.meta,
    data: result.data,
  })
})
const getSingleSemester = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await academicSemesterService.getSingleSemester(id)

  sendResponse<IAcademicSemester>(res, {
    statusCode: httpstatus.OK,
    success: true,
    message: 'Academic semester fetched successfully',
    data: result,
  })
})
const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const { ...data } = req.body
  const result = await academicSemesterService.updateSemester(id, data)

  sendResponse<IAcademicSemester>(res, {
    statusCode: httpstatus.OK,
    success: true,
    message: 'Academic semester updated  successfully',
    data: result,
  })
})
const deleteSemester = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  await academicSemesterService.deleteSemester(id)

  sendResponse<IAcademicSemester>(res, {
    statusCode: httpstatus.OK,
    success: true,
    message: 'Academic semester deleted  successfully',
    data: null,
  })
})

export const academicSemesterController = {
  createSemester,
  getSemesters,
  getSingleSemester,
  updateSemester,
  deleteSemester,
}
