import { Request, Response } from 'express'
import userService from './user.service'

const createUser = async (req: Request, res: Response) => {
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
    res.status(400).json({
      success: false,
      message: 'failed to create user',
    })
  }
}
export default { createUser }
