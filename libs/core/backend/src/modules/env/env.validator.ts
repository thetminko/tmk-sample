import { type ZodSchema } from 'zod';

export function parseConfig<Schema extends ZodSchema>(
  schema: Schema,
  config: Record<string, string>,
  instanceType: string
): Schema {
  return schema.parse({ ...config, INSTANCE_TYPE: instanceType });
}
