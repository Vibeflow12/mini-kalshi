import mongoose, { type InferSchemaType, type Model, Schema } from 'mongoose';

const fillSchema = new Schema(
  {
    orderbookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Orderbook',
      required: true,
    },
    buyOrderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bid',
      required: true,
    },
    sellOrderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ask',
      required: true,
    },
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    price: {
      type: BigInt,
      required:true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      validate: Number.isInteger,
    },
  },
  {
    timestamps: true,
  }
);


export type fillSchemaT = InferSchemaType<typeof fillSchema>;

const fill =
  (mongoose.models.fill as Model<fillSchemaT>) || mongoose.model<fillSchemaT>('fill', fillSchema);

export default fill;
