import z from 'zod';

export const onrampSchema = z.object({
  amount: z.coerce.bigint().positive(),
});
