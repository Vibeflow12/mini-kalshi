import mongoose, { type InferSchemaType, type Model, Schema } from 'mongoose';

const bidSchema = new Schema(
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

bidSchema.index({ orderbookId: 1, status: 1, price: -1 });

export type bidSchemaT = InferSchemaType<typeof bidSchema>;

const BidModel =
  (mongoose.models.Bid as Model<bidSchemaT>) || mongoose.model<bidSchemaT>('Bid', bidSchema);

export default BidModel;
