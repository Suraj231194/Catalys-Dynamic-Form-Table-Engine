import type { FormSchema } from '../types';

/**
 * User form schema configuration.
 * Defines the structure, validation, and behavior of the user registration form.
 * Modify this schema to change form fields without touching component code.
 */
export const userFormSchema: FormSchema = {
  fields: [
    {
      name: 'name',
      label: 'Full Name',
      type: 'text',
      required: true,
      defaultValue: '',
      placeholder: 'Enter full name',
    },
    {
      name: 'age',
      label: 'Age',
      type: 'number',
      required: true,
      placeholder: 'Enter age',
    },
    {
      name: 'role',
      label: 'Role',
      type: 'select',
      options: ['Admin', 'Manager', 'User'],
    },
    {
      name: 'isActive',
      label: 'Active',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'joiningDate',
      label: 'Joining Date',
      type: 'date',
      /** Only shown when the user is active */
      visibleWhen: {
        field: 'isActive',
        value: true,
      },
    },
  ],
};
