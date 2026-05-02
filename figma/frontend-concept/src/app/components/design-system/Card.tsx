import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function Card({ children, className = '', hoverable = false, padding = 'md' }: CardProps) {
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  return (
    <div
      className={`bg-card border border-border rounded-lg ${paddingClasses[padding]} ${hoverable ? 'hover:shadow-md transition-shadow cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
