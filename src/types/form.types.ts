/** Supported form field types */
export type FieldType = 'text' | 'number' | 'select' | 'checkbox' | 'date';

/** Schema definition for a single form field */
export interface FormFieldSchema {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  defaultValue?: string | number | boolean;
  options?: string[];
  /** Conditional rendering: field shown only when condition evaluates true */
  visibleWhen?: {
    field: string;
    value: unknown;
  };
  placeholder?: string;
}

/** Complete form schema definition */
export interface FormSchema {
  fields: FormFieldSchema[];
}

/** Form values stored as a record */
export type FormValues = Record<string, string | number | boolean>;

/** Validation error map */
export type FormErrors = Record<string, string>;
