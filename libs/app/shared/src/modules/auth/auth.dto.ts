import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { Authority } from './auth.const.js';

export const principalSchema = z.object({
  id: z.number(),
  uuid: z.string().uuid(),
  authorities: z.array(z.nativeEnum(Authority))
});

export class PrincipalDto extends createZodDto(principalSchema) {}
