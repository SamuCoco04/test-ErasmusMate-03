import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'social';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  className = '',
  fullWidth = false
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center gap-2 rounded-lg transition-all';

  const variantClasses = {
    primary: 'bg-[--institutional-primary] text-white hover:bg-[--institutional-secondary] disabled:bg-slate-300',
    secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200 disabled:bg-slate-50',
    outline: 'border-2 border-slate-300 text-slate-700 hover:bg-slate-50 disabled:border-slate-200',
    ghost: 'text-slate-700 hover:bg-slate-100 disabled:text-slate-400',
    destructive: 'bg-[--destructive] text-white hover:bg-red-700 disabled:bg-red-300',
    social: 'bg-[--social-primary] text-white hover:bg-[--social-secondary] disabled:bg-orange-300',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`}
    >
      {children}
    </button>
  );
}
