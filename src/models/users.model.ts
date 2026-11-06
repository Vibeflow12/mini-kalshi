import mongoose, { type InferSchemaType, type Model, Schema } from 'mongoose';

const usersSchema = new Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

export type UserT = InferSchemaType<typeof usersSchema>;

const User = (mongoose.models.Users as Model<UserT>) || mongoose.model<UserT>('User', usersSchema);

export default User;
