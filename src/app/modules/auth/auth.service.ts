import { IUser } from '../user/user.interface'

const login = async (credentials: IUser): Promise<IUser | null> => {
  // Hashed password

  return credentials
}

export const AuthService = {
  login,
}
