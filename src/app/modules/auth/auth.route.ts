import express from 'express'
// import { ENUM_USER_ROLE } from '../../../enums/user'
// import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { AuthController } from './auth.controller'
import { AuthValidation } from './auth.validation'
import auth from '../../middlewares/auth'
import { ENUM_USER_ROLE } from '../../../enums/user'
const router = express.Router()

router.post(
  '/login',
  validateRequest(AuthValidation.loginZOdSchema),
  AuthController.login,
)
router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenZOdSchema),
  AuthController.refreshToken,
)
router.post(
  '/change-password',
  validateRequest(AuthValidation.changePasswordZodSchema),
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT,
  ),
  AuthController.changePassword,
)

export const AuthRoutes = router
