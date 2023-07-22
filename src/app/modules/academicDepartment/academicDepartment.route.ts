import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { academicDepartmentController } from './academicDepartment.controller'
import { academicDepartmentValidation } from './academicDepartment.validation'

const router = express.Router()

router.post(
  '/create-department',
  validateRequest(academicDepartmentValidation.createDepartmentZodSchema),
  academicDepartmentController.createDepartment,
)
router.get('/', academicDepartmentController.getDepartments)
router.get('/:id', academicDepartmentController.getSingleDepartment)

router.patch(
  '/:id',
  validateRequest(academicDepartmentValidation.updateDepartmentZodSchema),
  academicDepartmentController.updateDepartment,
)
router.delete('/:id', academicDepartmentController.deleteDepartment)

export const academicDepartmentRoutes = router
