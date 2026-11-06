export interface IUser {
  username: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  usdBalance: bigint;
  lockedUsdBalance: bigint;
}

export interface AuthTokenPayload {
  id: string;
  role: 'user' | 'admin';
}
