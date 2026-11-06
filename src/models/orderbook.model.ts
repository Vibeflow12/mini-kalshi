import mongoose, { type InferSchemaType, type Model, Schema } from 'mongoose';

const orderbookModelSchema = new Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

orderbookModelSchema.index({ marketId: 1, type: 1 }, { unique: true });

export type OrderbookT = InferSchemaType<typeof orderbookModelSchema>;

const orderbook =
  (mongoose.models.Orderbook as Model<OrderbookT>) ||
  mongoose.model<OrderbookT>('Orderbook', orderbookModelSchema);

export default orderbook;
