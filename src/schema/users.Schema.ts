import mongoose, { type Model, Schema, models } from 'mongoose';
import type { IUser } from '../types/user.types';

const usersSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  usdBalance: {
    type: BigInt,
    default: 0n,
  },
  lockedUsdBalance: {
    type: BigInt,
    default: 0n,
  },
});

const User: Model<IUser> =
  (models.Users as Model<IUser>) || mongoose.model<IUser>('Users', usersSchema);

export default User;
