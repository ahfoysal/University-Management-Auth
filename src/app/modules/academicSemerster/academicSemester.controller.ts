import { NextFunction, Request, Response } from 'express'
import httpstatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { paginationFields } from '../../constants/pagination'
import { IAcademicSemester } from './academicSemester.interface'
import { academicSemesterService } from './academicSemester.service'
import { academicSemesterFilterableFields } from './academicSemester.constant'

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...data } = req.body
    const result = await academicSemesterService.createSemester(data)
    next()
    sendResponse<IAcademicSemester>(res, {
      statusCode: httpstatus.OK,
      success: true,
      message: 'Academic semester created successfully',
      data: result,
    })
  },
)
const getSemesters = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const paginationOptions = pick(req.query, paginationFields)
    const filters = pick(req.query, academicSemesterFilterableFields)
    const result = await academicSemesterService.getSemesters(
      filters,
      paginationOptions,
    )
    next()
    sendResponse<IAcademicSemester[]>(res, {
      statusCode: httpstatus.OK,
      success: true,
      message: 'Academic semesters fetched successfully',
      meta: result.meta,
      data: result.data,
    })
  },
)
const getSingleSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const result = await academicSemesterService.getSingleSemester(id)
    next()
    sendResponse<IAcademicSemester>(res, {
      statusCode: httpstatus.OK,
      success: true,
      message: 'Academic semester fetched successfully',
      data: result,
    })
  },
)

export const academicSemesterController = {
  createSemester,
  getSemesters,
  getSingleSemester,
}
