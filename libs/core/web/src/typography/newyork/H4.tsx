import { cn } from '../../utils';
import type { TypographyProps } from '../type';

export function H4({ children, className }: TypographyProps) {
  return <h4 className={cn('scroll-m-20 text-xl font-semibold text-primary', className)}>{children}</h4>;
}
