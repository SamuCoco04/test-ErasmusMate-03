import { ReactNode } from 'react';

interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  helper?: string;
  icon?: ReactNode;
  disabled?: boolean;
  required?: boolean;
}

export function Input({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  error,
  helper,
  icon,
  disabled = false,
  required = false
}: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm text-slate-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          className={`w-full px-3 py-2 border rounded-lg transition-colors bg-input-background ${
            icon ? 'pl-10' : ''
          } ${
            error
              ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100'
              : 'border-border focus:border-[--institutional-primary] focus:ring-2 focus:ring-blue-100'
          } ${
            disabled ? 'bg-slate-50 text-slate-500 cursor-not-allowed' : ''
          }`}
        />
      </div>
      {error && <span className="text-xs text-red-600">{error}</span>}
      {helper && !error && <span className="text-xs text-slate-500">{helper}</span>}
    </div>
  );
}
