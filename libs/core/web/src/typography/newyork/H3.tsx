import { cn } from '../../utils';
import type { TypographyProps } from '../type';

export function H3({ children, className }: TypographyProps) {
  return <h3 className={cn('scroll-m-20 text-2xl font-semibold text-primary', className)}>{children}</h3>;
}
