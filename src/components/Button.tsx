import Link from 'next/link';
import { cn } from '@/src/lib/cn';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

type ButtonLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: ButtonVariant;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-white hover:bg-blue-700',
  secondary: 'border border-slate-300 bg-white text-slate-800 hover:bg-slate-50',
  ghost: 'bg-transparent text-accent hover:bg-blue-50'
};

const baseStyles = 'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition';

export function Button({ className, variant = 'primary', type = 'button', ...props }: ButtonProps) {
  return <button type={type} className={cn(baseStyles, variantStyles[variant], className)} {...props} />;
}

export function ButtonLink({ className, variant = 'primary', href, ...props }: ButtonLinkProps) {
  return <Link href={href} className={cn(baseStyles, variantStyles[variant], 'no-underline', className)} {...props} />;
}
