import mongoose, { type InferSchemaType, type Model, Schema } from 'mongoose';

const askSchema = new Schema(
  {
    orderbookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Orderbook',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    price: {
      type: BigInt,
      default: 0n,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      validate: Number.isInteger,
    },
    remainingQuantity: {
      type: Number,
      required: true,
      min: 0,
      validate: Number.isInteger,
    },
    status: {
      type: String,
      enum: ['OPEN', 'FILLED', 'PARTIALLY_FILLED', 'CANCELLED'],
      default: 'OPEN',
    },
  },
  {
    timestamps: true,
  }
);

askSchema.index({ orderbookId: 1, status: 1, price: 1 });

export type askSchemaT = InferSchemaType<typeof askSchema>;

const Ask =
  (mongoose.models.Ask as Model<askSchemaT>) || mongoose.model<askSchemaT>('Ask', askSchema);

export default Ask;
