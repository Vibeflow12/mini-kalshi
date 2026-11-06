import mongoose, { type Model, Schema, models } from 'mongoose';
import type { IOrderbook } from '../types/orderbook.types';

const orderbookSchema = new Schema<IOrderbook>({
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
});

orderbookSchema.index({ marketId: 1, type: 1 }, { unique: true });

const Orderbook: Model<IOrderbook> =
  (models.Orderbook as Model<IOrderbook>) ||
  mongoose.model<IOrderbook>('Orderbook', orderbookSchema);

export default Orderbook;
