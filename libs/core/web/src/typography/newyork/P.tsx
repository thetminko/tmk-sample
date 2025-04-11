import { cn } from '../../utils';
import type { TypographyProps } from '../type';

export function P({ children, className }: TypographyProps) {
  return <p className={cn('leading-7 text-primary', className)}>{children}</p>;
}
