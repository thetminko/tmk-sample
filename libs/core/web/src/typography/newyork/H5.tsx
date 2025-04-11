import { cn } from '../../utils';
import type { TypographyProps } from '../type';

export function H5({ children, className }: TypographyProps) {
  return <h5 className={cn('scroll-m-20 text-lg font-semibold text-primary', className)}>{children}</h5>;
}
