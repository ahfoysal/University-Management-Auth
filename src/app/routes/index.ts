import express from 'express'
import { userRoutes } from '../modules/user/user.route'
import { academicSemesterRoutes } from '../modules/academicSemerster/academicSemester.route'

const router = express.Router()

const routes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/academic-semesters',
    route: academicSemesterRoutes,
  },
]

routes.forEach(route => {
  router.use(route.path, route.route)
})

export default router
