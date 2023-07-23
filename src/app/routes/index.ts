import express from 'express'
import { academicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route'
import { academicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route'
import { academicSemesterRoutes } from '../modules/academicSemester/academicSemester.route'
import { UserRoutes } from '../modules/user/user.route'

const router = express.Router()

const routes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/academic-semesters',
    route: academicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: academicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    route: academicDepartmentRoutes,
  },
]

routes.forEach(route => {
  router.use(route.path, route.route)
})

export default router
