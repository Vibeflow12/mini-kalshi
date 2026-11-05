import mongoose, { type Model, Schema, models } from 'mongoose';
import type { IUser } from '../types/user.types';

const usersSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User: Model<IUser> = models.Users || mongoose.model<IUser>('Users', usersSchema);

export default User;
