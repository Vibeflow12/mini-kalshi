import mongoose, { type InferSchemaType, type Model, Schema } from 'mongoose';

const stockBalanceSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    marketId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Market',
      required: true,
    },
    type: {
      type: String,
      enum: ['YES', 'NO'],
      required: true,
    },
    quantity: {
      type: Number,
    },
    locked: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

stockBalanceSchema.index({ userId: 1, marketId: 1, type: 1 }, { unique: true });

export type stockBalanceT = InferSchemaType<typeof stockBalanceSchema>;

const stockBalance =
  (mongoose.models.StockBalance as Model<stockBalanceT>) ||
  mongoose.model<stockBalanceT>('StockBalance', stockBalanceSchema);

export default stockBalance;
