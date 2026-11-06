import type { Types } from 'mongoose';

export interface IOrderbook {
  marketId: Types.ObjectId;
  type: 'YES' | 'NO';
}
