import { NextFunction, Request, Response } from 'express'
import httpstatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { paginationFields } from '../../constants/pagination'
import { academicSemesterService } from './academicSemester.service'

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...data } = req.body
    const result = await academicSemesterService.createSemester(data)
    next()
    sendResponse(res, {
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

    const result = await academicSemesterService.getSemesters(paginationOptions)
    next()
    sendResponse(res, {
      statusCode: httpstatus.OK,
      success: true,
      message: 'Academic semesters fetched successfully',
      data: result,
    })
  },
)
export const academicSemesterController = { createSemester, getSemesters }
