import { z } from 'zod';

const validEnvs = ['local', 'development', 'sit', 'staging', 'production'] as const;

const instanceTypes = ['api', 'ws'] as const;

export const envSchema = z.object({
  ENVIRONMENT: z.enum(validEnvs),
  INSTANCE_TYPE: z.enum(instanceTypes),
  API_PORT: z.coerce.number(),
  DB_HOST: z.string(),
  DB_PORT: z.coerce.number(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string()
  // REDIS_HOST: z.string(),
  // REDIS_PORT: z.coerce.number(),
  // PROXY_HOST: z.string(),
  // PROXY_PORT: z.coerce.number(),
  // JWT_EXPIRES_IN: z.string(),
  // JWT_SECRET: z.string(),
  // SYS_ADMIN_KEY_UUID: z.string().uuid(),
  // COOKIE_SECRET: z.string()
});
export type Env = z.infer<typeof envSchema>;
