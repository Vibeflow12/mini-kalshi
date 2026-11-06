import mongoose, { type InferSchemaType, type Model, Schema } from 'mongoose';

const TransactionlogSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    marketId: {
      type: Schema.Types.ObjectId,
      ref: 'Market',
    },
    orderId: {
      type: Schema.Types.ObjectId,
      required: false,
    },
    type: {
      type: String,
      enum: ['DEPOSIT', 'WITHDRAWAL', 'BUY', 'SELL', 'SETTLEMENT'],
      required: true,
    },
    assetType: {
      type: String,
      enum: ['USD', 'YES', 'NO'],
      required: true,
    },
    amount: {
      type: BigInt,
      required: true,
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

export type TransactionlogSchemaT = InferSchemaType<typeof TransactionlogSchema>;

const TransactionLogs =
  (mongoose.models.TransactionLog as Model<TransactionlogSchemaT>) ||
  mongoose.model<TransactionlogSchemaT>('TransactionLog', TransactionlogSchema);

export default TransactionLogs;
