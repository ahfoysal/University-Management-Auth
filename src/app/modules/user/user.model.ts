import bcrypt from 'bcrypt'
import { Schema, model } from 'mongoose'
import config from '../../../config'
import { IUser, IUserMethods, UserModel } from './user.interface'

const UserSchema = new Schema<IUser, Record<string, never>, IUserMethods>(
  {
    id: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    password: { type: String, required: true, select: 0 },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
      required: false,
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
      required: false,
    },
    needPasswordChange: { type: Boolean, default: true },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
      required: false,
    },
  },
  {
    timestamps: true,
  },
)
UserSchema.methods.isUserExist = async function (
  id: string,
): Promise<Pick<IUser, 'id' | 'role' | 'needPasswordChange'> | null> {
  return await User.findOne(
    { id: id },
    { id: 1, needPasswordChange: 1, password: 1, role: 1 },
  )
}
UserSchema.methods.isPasswordMatched = async function (
  givenPassword: string,
  password: string,
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, password)
}

UserSchema.pre('save', async function (next) {
  // Hashing
  const rounds = Number(config.bcrypt_salt_rounds)

  this.password = await bcrypt.hash(this.password, rounds)
  next()
})

export const User = model<IUser, UserModel>('User', UserSchema)
