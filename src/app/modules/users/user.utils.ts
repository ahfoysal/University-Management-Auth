import { User } from './user.model'

export const lastUserId = async () => {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()
  return lastUser?.id
}

export const generatedUserId = async () => {
  const createUser = (await lastUserId()) || (0).toString().padStart(5, '0')
  const incrementedId = (parseInt(createUser) + 1).toString().padStart(5, '0')
  return incrementedId
  //   lastUserId++
  //   return String(lastUserId).padStart(5, '0')
}
