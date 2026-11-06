import mongoose, { type Model, Schema, models } from 'mongoose';
import type { IMarket } from '../types/market.types';

const marketSchema = new Schema<IMarket>({
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
});

const Market: Model<IMarket> =
  (models.Market as Model<IMarket>) || mongoose.model<IMarket>('Market', marketSchema);

export default Market;
