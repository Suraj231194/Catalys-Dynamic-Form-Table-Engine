/** Column configuration for dynamic table */
export interface TableColumnConfig {
  accessorKey: string;
  header: string;
  enableSorting?: boolean;
  enableFiltering?: boolean;
  /** Custom cell type for special rendering */
  cellType?: 'boolean' | 'date' | 'text';
}

/** Complete table configuration */
export interface TableConfig {
  columns: TableColumnConfig[];
}

/** Generic row data type */
export type RowData = Record<string, string | number | boolean>;
