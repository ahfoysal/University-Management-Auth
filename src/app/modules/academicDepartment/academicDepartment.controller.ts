import { Request, Response } from 'express'
import httpstatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { paginationFields } from '../../constants/pagination'
import { academicDepartmentFilterableFields } from './academicDepartment.constant'
import { IAcademicDepartment } from './academicDepartment.interface'
import { AcademicDepartmentService } from './academicDepartment.service'

const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body
  const result = await AcademicDepartmentService.createDepartment(data)

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpstatus.OK,
    success: true,
    message: 'Academic Department created successfully',
    data: result,
  })
})
const getDepartments = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields)
  const filters = pick(req.query, academicDepartmentFilterableFields)

  const result = await AcademicDepartmentService.getDepartments(
    filters,
    paginationOptions,
  )

  sendResponse<IAcademicDepartment[]>(res, {
    statusCode: httpstatus.OK,
    success: true,
    message: 'Academic faculty fetched successfully',
    meta: result.meta,
    data: result.data,
  })
})
const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await AcademicDepartmentService.getSingleDepartment(id)

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpstatus.OK,
    success: true,
    message: 'Academic faculty fetched successfully',
    data: result,
  })
})
const updateDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const { ...data } = req.body
  const result = await AcademicDepartmentService.updateDepartment(id, data)

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpstatus.OK,
    success: true,
    message: 'Academic faculty updated  successfully',
    data: result,
  })
})
const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  await AcademicDepartmentService.deleteDepartment(id)

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpstatus.OK,
    success: true,
    message: 'Academic faculty deleted  successfully',
    data: null,
  })
})

export const AcademicDepartmentController = {
  createDepartment,
  getDepartments,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
}
