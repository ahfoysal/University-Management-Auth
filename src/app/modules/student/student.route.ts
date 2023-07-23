import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { academicFacultyController } from './student.controller'
import { academicFacultyValidation } from './student.validation'

const router = express.Router()

router.post(
  '/create-academic-faculty',
  validateRequest(academicFacultyValidation.createFacultyZodSchema),
  academicFacultyController.createFaculty,
)
router.get('/', academicFacultyController.getFaculty)
router.get('/:id', academicFacultyController.getSingleFaculty)

router.patch(
  '/:id',
  validateRequest(academicFacultyValidation.updateFacultyZodSchema),
  academicFacultyController.updateFaculty,
)
router.delete('/:id', academicFacultyController.deleteFaculty)

export const academicFacultyRoutes = router
