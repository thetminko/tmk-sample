import { cn } from '../../utils';
import type { TypographyProps } from '../type';
import { P } from './P';

export function FieldError({ children, className }: Partial<TypographyProps>) {
  if (!children) {
    return null;
  }

  return <P className={cn('text-xs italic text-red-500', className)}>{children}</P>;
}
