import { useState, useRef, useEffect } from 'react';
import type { FormFieldSchema, FormValues } from '../../types';

interface FormFieldProps {
  field: FormFieldSchema;
  value: string | number | boolean;
  error?: string;
  touched: boolean;
  onChange: (name: string, value: string | number | boolean) => void;
  onBlur: (name: string) => void;
  allValues: FormValues;
}

export function FormField({
  field,
  value,
  error,
  touched,
  onChange,
  onBlur,
  allValues,
}: FormFieldProps) {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsSelectOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Conditional rendering
  if (field.visibleWhen) {
    const dependentValue = allValues[field.visibleWhen.field];
    if (dependentValue !== field.visibleWhen.value) {
      return null;
    }
  }

  const hasError = touched && error;
  const fieldId = `field-${field.name}`;

  const inputBase = [
    'w-full px-4 py-3 rounded-xl text-sm',
    'bg-surface-800/70 border',
    'text-white placeholder:text-surface-500',
    'outline-none transition-all duration-200',
    'focus:ring-2 focus:ring-offset-0',
    'hover:border-surface-500',
    hasError
      ? 'border-danger-500/60 focus:ring-danger-500/30 focus:border-danger-400'
      : 'border-surface-700/80 focus:ring-primary-500/30 focus:border-primary-500',
  ].join(' ');

  const renderInput = () => {
    switch (field.type) {
      case 'text':
        return (
          <input
            id={fieldId}
            type="text"
            value={String(value)}
            placeholder={field.placeholder ?? `Enter ${field.label.toLowerCase()}`}
            onChange={(e) => onChange(field.name, e.target.value)}
            onBlur={() => onBlur(field.name)}
            className={inputBase}
            autoComplete="off"
          />
        );

      case 'number':
        return (
          <input
            id={fieldId}
            type="number"
            min="0"
            max="100"
            value={String(value)}
            placeholder={field.placeholder ?? `Enter ${field.label.toLowerCase()}`}
            onChange={(e) => onChange(field.name, e.target.value)}
            onBlur={() => onBlur(field.name)}
            className={inputBase}
          />
        );

      case 'select':
        return (
          <div className="relative" ref={selectRef}>
            <button
              id={fieldId}
              type="button"
              onClick={() => setIsSelectOpen(!isSelectOpen)}
              onBlur={() => onBlur(field.name)}
              className={`${inputBase} flex items-center justify-between text-left cursor-pointer`}
            >
              <span className={!value ? 'text-surface-500' : 'text-white'}>
                {value ? String(value) : `Select ${field.label.toLowerCase()}`}
              </span>
              <svg 
                className={`w-4 h-4 transition-transform duration-200 text-surface-400 ${isSelectOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isSelectOpen && (
              <div className="absolute left-0 right-0 top-full mt-2 z-50 rounded-xl bg-surface-800 border border-surface-700 shadow-2xl shadow-black/40 p-1.5 animate-in fade-in zoom-in duration-150">
                <div 
                  className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-surface-500 border-b border-surface-700/50 mb-1"
                >
                  Choose {field.label}
                </div>
                {field.options?.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      onChange(field.name, opt);
                      setIsSelectOpen(false);
                    }}
                    className={`
                      w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors cursor-pointer
                      ${value === opt 
                        ? 'bg-primary-500/20 text-primary-300 font-medium' 
                        : 'text-surface-300 hover:bg-surface-700 hover:text-white'}
                    `}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        );

      case 'checkbox':
        return (
          <label htmlFor={fieldId} className="inline-flex items-center gap-3 cursor-pointer group select-none">
            <button
              id={fieldId}
              type="button"
              role="switch"
              aria-checked={Boolean(value)}
              onClick={() => onChange(field.name, !value)}
              className={`relative w-12 h-7 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:ring-offset-0 ${
                Boolean(value) ? 'bg-primary-500' : 'bg-surface-700'
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-200 ${
                  Boolean(value) ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
            <span className="text-sm text-surface-300 group-hover:text-white transition-colors">
              {Boolean(value) ? 'Enabled' : 'Disabled'}
            </span>
          </label>
        );

      case 'date':
        return (
          <input
            id={fieldId}
            type="date"
            value={String(value)}
            onChange={(e) => onChange(field.name, e.target.value)}
            onBlur={() => onBlur(field.name)}
            className={`${inputBase} cursor-pointer [color-scheme:dark]`}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-2">
      {field.type !== 'checkbox' ? (
        <label htmlFor={fieldId} className="flex items-center gap-1.5 text-sm font-medium text-surface-300">
          {field.label}
          {field.required && <span className="text-danger-400 text-xs">*</span>}
        </label>
      ) : (
        <span className="block text-sm font-medium text-surface-300 mb-1">
          {field.label}
          {field.required && <span className="text-danger-400 text-xs ml-1">*</span>}
        </span>
      )}

      {renderInput()}

      {hasError && (
        <p className="flex items-center gap-1.5 text-xs text-danger-400">
          <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
