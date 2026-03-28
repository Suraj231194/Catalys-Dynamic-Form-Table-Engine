import { useState, useCallback } from 'react';
import type { FormSchema, FormValues, FormErrors, FormFieldSchema } from '../types';

/** Default value for a field based on its type */
function getDefaultValue(field: FormFieldSchema): string | number | boolean {
  if (field.defaultValue !== undefined) return field.defaultValue;
  switch (field.type) {
    case 'checkbox':
      return false;
    case 'number':
      return '';
    case 'select':
      return field.options?.[0] ?? '';
    default:
      return '';
  }
}

/** Build initial form values from schema */
function buildInitialValues(schema: FormSchema): FormValues {
  const values: FormValues = {};
  schema.fields.forEach((field) => {
    values[field.name] = getDefaultValue(field);
  });
  return values;
}

/** Validate form values against schema */
function validateForm(schema: FormSchema, values: FormValues): FormErrors {
  const errors: FormErrors = {};
  schema.fields.forEach((field) => {
    if (!field.required) return;

    const value = values[field.name];

    if (field.type === 'checkbox') return; // Checkbox always has a value
    if (value === undefined || value === null || value === '') {
      errors[field.name] = `${field.label} is required`;
    }

    if (field.type === 'number' && typeof value === 'string' && value !== '') {
      const numValue = Number(value);
      if (isNaN(numValue)) {
        errors[field.name] = `${field.label} must be a valid number`;
      } else if (field.name === 'age' && (numValue < 0 || numValue > 100)) {
        errors[field.name] = `${field.label} must be between 0 and 100`;
      }
    }
  });
  return errors;
}

interface UseFormReturn {
  values: FormValues;
  errors: FormErrors;
  touched: Record<string, boolean>;
  handleChange: (name: string, value: string | number | boolean) => void;
  handleBlur: (name: string) => void;
  handleSubmit: () => FormValues | null;
  resetForm: () => void;
  isValid: boolean;
}

/**
 * Custom hook for form state management.
 * Handles controlled inputs, validation, and submission.
 */
export function useForm(schema: FormSchema): UseFormReturn {
  const [values, setValues] = useState<FormValues>(() => buildInitialValues(schema));
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = useCallback((name: string, value: string | number | boolean) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    setErrors((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }, []);

  const handleBlur = useCallback((name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
  }, []);

  const handleSubmit = useCallback((): FormValues | null => {
    // Mark all fields as touched
    const allTouched: Record<string, boolean> = {};
    schema.fields.forEach((f) => {
      allTouched[f.name] = true;
    });
    setTouched(allTouched);

    const validationErrors = validateForm(schema, values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return null;
    }

    // Normalize values for submission
    const submittedValues: FormValues = {};
    schema.fields.forEach((field) => {
      const val = values[field.name];
      if (field.type === 'number' && typeof val === 'string') {
        submittedValues[field.name] = val === '' ? 0 : Number(val);
      } else {
        submittedValues[field.name] = val;
      }
    });

    return submittedValues;
  }, [schema, values]);

  const resetForm = useCallback(() => {
    setValues(buildInitialValues(schema));
    setErrors({});
    setTouched({});
  }, [schema]);

  const isValid = Object.keys(errors).length === 0;

  return { values, errors, touched, handleChange, handleBlur, handleSubmit, resetForm, isValid };
}
