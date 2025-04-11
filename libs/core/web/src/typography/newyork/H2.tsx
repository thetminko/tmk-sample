import { cn } from '../../utils';
import type { TypographyProps } from '../type';

export function H2({ children, className }: TypographyProps) {
  return <h2 className={cn('scroll-m-20 pb-2 text-3xl font-semibold text-primary', className)}>{children}</h2>;
}
