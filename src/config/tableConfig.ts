import type { TableConfig, RowData } from '../types';

/**
 * User table configuration.
 * Defines column structure, headers, and rendering behavior.
 * Modify this configuration to change table columns without touching component code.
 */
export const userTableConfig: TableConfig = {
  columns: [
    { accessorKey: 'name', header: 'Name', enableSorting: true, enableFiltering: true },
    { accessorKey: 'age', header: 'Age', enableSorting: true },
    { accessorKey: 'role', header: 'Role', enableSorting: true, enableFiltering: true },
    { accessorKey: 'isActive', header: 'Status', cellType: 'boolean', enableSorting: true },
    { accessorKey: 'joiningDate', header: 'Joining Date', cellType: 'date', enableSorting: true },
  ],
};

/**
 * Initial dataset for the table.
 */
export const initialData: RowData[] = [
  {
    name: 'John Doe',
    age: 28,
    role: 'Admin',
    isActive: true,
    joiningDate: '2023-01-15',
  },
];
