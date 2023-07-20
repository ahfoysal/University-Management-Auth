import { RequestHandler } from 'express'
import { userService } from './user.service'

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.body
    if (!user) return res.status(400).json({ message: 'missing user' })
    const result = await userService.createUser(user)
    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}
export const userController = { createUser }
