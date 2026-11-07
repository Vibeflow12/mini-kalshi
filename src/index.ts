import dotenv from 'dotenv';
import express from 'express';
import type { Request, Response } from 'express';
import connectDB from './db.ts';
import { authRouter } from './routes/authRoute.ts';
import { onrampRouter } from './routes/onrampRoute.ts';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  return res.send('server is up');
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/onramp', onrampRouter);

connectDB()
  .then(() => {
    console.log('DB promise resolved');

    const server = app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });

    server.on('error', (error) => {
      console.error('Express server error:', error);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to DB:', error);
  });
