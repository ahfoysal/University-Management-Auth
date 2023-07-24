import bcrypt from 'bcrypt'
import { Schema, model } from 'mongoose'
import config from '../../../config'
import { IUser, UserModel } from './user.interface'
const UserSchema = new Schema<IUser>(
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
UserSchema.pre('save', async function (next) {
  // Hashing
  const rounds = Number(config.bcrypt_salt_rounds)

  this.password = await bcrypt.hash(this.password, rounds)
  next()
})

export const User = model<IUser, UserModel>('User', UserSchema)
