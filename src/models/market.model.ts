import mongoose, { type InferSchemaType, type Model, Schema } from 'mongoose';

const marketSchema = new Schema(
  {
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    totalIssued: {
      type: Number,
      required: true,
    },
    resolution: {
      type: String,
      enum: ['YES', 'NO', 'PENDING'],
      default: 'PENDING',
    },
    expiry: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['OPEN', 'RESOLVED'],
    },
  },
  {
    timestamps: true,
  }
);

export type marketT = InferSchemaType<typeof marketSchema>;

const Market =
  (mongoose.models.Market as Model<marketT>) || mongoose.model<marketT>('Market', marketSchema);

export default Market;
