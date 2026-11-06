import type { Types } from 'mongoose';

export interface IMarket {
  creatorId: Types.ObjectId;
  title: string;
  totalIssued: number;
  resolution: 'YES' | 'NO' | 'PENDING';
  expiry: Date;
  status: 'OPEN' | 'RESOLVED';
}
