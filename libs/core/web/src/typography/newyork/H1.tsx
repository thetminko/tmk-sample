import { cn } from '../../utils';
import type { TypographyProps } from '../type';

export function H1({ children, className }: TypographyProps) {
  return <h1 className={cn('scroll-m-20 text-4xl font-extrabold text-primary lg:text-5xl', className)}>{children}</h1>;
}
