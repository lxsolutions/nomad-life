

import { router, publicProcedure } from './trpc';
import { z } from 'zod';

export const appRouter = router({
  health: publicProcedure
    .query(() => {
      return { status: 'ok', timestamp: new Date().toISOString() };
    }),
  listings: router({
    list: publicProcedure
      .input(z.object({
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(100).default(20),
        filters: z.object({
          minPrice: z.number().optional(),
          maxPrice: z.number().optional(),
          bedrooms: z.number().optional(),
          district: z.string().optional(),
          nearBts: z.string().optional(),
          nearMrt: z.string().optional(),
        }).optional(),
      }))
      .query(async ({ input, ctx }) => {
        // TODO: Implement listing query with filters
        return {
          listings: [],
          total: 0,
          page: input.page,
          limit: input.limit,
        };
      }),
  }),
});

export type AppRouter = typeof appRouter;

