import { useCallback } from 'react';
import type { FormSchema, FormValues } from '../../types';
import { useForm } from '../../hooks';
import { FormField } from './FormField';

interface FormRendererProps {
  schema: FormSchema;
  onSubmit: (values: FormValues) => void;
}

export function FormRenderer({ schema, onSubmit }: FormRendererProps) {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit, resetForm } =
    useForm(schema);

  const onFormSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const result = handleSubmit();
      if (result) {
        onSubmit(result);
        resetForm();
      }
    },
    [handleSubmit, onSubmit, resetForm],
  );

  return (
    <form onSubmit={onFormSubmit} className="space-y-8" noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
        {schema.fields.map((field) => (
          <div key={field.name} className="animate-in fade-in duration-300">
            <FormField
              field={field}
              value={values[field.name]}
              error={errors[field.name]}
              touched={!!touched[field.name]}
              onChange={handleChange}
              onBlur={handleBlur}
              allValues={values}
            />
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 pt-2 border-t border-surface-800/50">
        <button
          type="submit"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold text-sm shadow-lg shadow-primary-600/25 hover:shadow-xl hover:shadow-primary-500/30 hover:from-primary-500 hover:to-primary-400 active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:ring-offset-2 focus:ring-offset-surface-900 cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Entry
        </button>

        <button
          type="button"
          onClick={resetForm}
          className="px-6 py-3 rounded-xl bg-surface-800/50 border border-surface-700/80 text-surface-400 font-medium text-sm hover:bg-surface-700/50 hover:text-surface-200 hover:border-surface-600 active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-surface-500/20 cursor-pointer"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
