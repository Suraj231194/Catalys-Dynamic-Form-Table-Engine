import { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
  type SortingState,
  type ColumnDef,
  type VisibilityState,
} from '@tanstack/react-table';
import type { TableConfig, RowData } from '../../types';

interface DataTableProps {
  config: TableConfig;
  data: RowData[];
  onDeleteRow?: (index: number) => void;
}

export function DataTable({ config, data, onDeleteRow }: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [showColumnMenu, setShowColumnMenu] = useState(false);

  const columns = useMemo<ColumnDef<RowData>[]>(() => {
    const configColumns: ColumnDef<RowData>[] = config.columns.map((col) => ({
      accessorKey: col.accessorKey,
      header: col.header,
      enableSorting: col.enableSorting ?? true,
      cell: ({ getValue }) => {
        const value = getValue();

        if (col.cellType === 'boolean') {
          const isActive = Boolean(value);
          return (
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                isActive
                  ? 'bg-accent-500/10 text-accent-400 ring-1 ring-inset ring-accent-500/20'
                  : 'bg-danger-500/10 text-danger-400 ring-1 ring-inset ring-danger-500/20'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-accent-400' : 'bg-danger-400'}`} />
              {isActive ? 'Active' : 'Inactive'}
            </span>
          );
        }

        if (col.cellType === 'date' && typeof value === 'string' && value) {
          try {
            return new Date(value).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            });
          } catch {
            return String(value);
          }
        }

        return String(value ?? '—');
      },
    }));

    if (onDeleteRow) {
      configColumns.push({
        id: 'actions',
        header: '',
        enableSorting: false,
        cell: ({ row }) => (
          <button
            onClick={() => onDeleteRow(row.index)}
            className="p-2 rounded-lg text-surface-500 hover:text-danger-400 hover:bg-danger-500/10 transition-all duration-150 cursor-pointer"
            title="Delete entry"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        ),
      });
    }

    return configColumns;
  }, [config.columns, onDeleteRow]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter, columnVisibility },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  });

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 w-full sm:max-w-xs">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search records..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-950 dark:bg-surface-800/70 border border-surface-700/80 text-surface-50 placeholder:text-surface-500 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 hover:border-surface-600 shadow-sm dark:shadow-none"
          />
        </div>

        {/* Column Visibility */}
        <div className="relative">
          <button
            onClick={() => setShowColumnMenu(!showColumnMenu)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-950 dark:bg-surface-800/70 border border-surface-700/80 text-surface-600 dark:text-surface-300 text-sm font-bold hover:bg-surface-100 dark:hover:bg-surface-700/70 hover:text-surface-50 dark:hover:text-white hover:border-surface-600 transition-all duration-200 cursor-pointer shadow-sm dark:shadow-none"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Columns
          </button>

          {showColumnMenu && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowColumnMenu(false)} />
              <div className="absolute right-0 top-full mt-2 z-20 w-52 rounded-xl bg-surface-950 dark:bg-surface-800 border border-surface-700 shadow-2xl shadow-black/10 dark:shadow-black/40 p-1.5 animate-in fade-in zoom-in duration-150">
                <div className="px-3 py-2 text-[10px] font-black uppercase tracking-wider text-surface-500 border-b border-surface-700/50 mb-1">
                  Visible Columns
                </div>
                {table.getAllLeafColumns().map((column) => {
                  if (column.id === 'actions') return null;
                  return (
                    <label
                      key={column.id}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-surface-100 dark:hover:bg-surface-700/60 transition-colors text-sm text-surface-600 dark:text-surface-300 hover:text-surface-50 dark:hover:text-white"
                    >
                      <input
                        type="checkbox"
                        checked={column.getIsVisible()}
                        onChange={column.getToggleVisibilityHandler()}
                        className="w-4 h-4 rounded border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-900 text-primary-500 focus:ring-primary-500/30 focus:ring-offset-0 cursor-pointer accent-primary-500"
                      />
                      {typeof column.columnDef.header === 'string' ? column.columnDef.header : column.id}
                    </label>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Record count */}
        <div className="px-3 py-1.5 rounded-lg bg-primary-500/10 text-primary-600 dark:text-primary-300 text-xs font-black border border-primary-500/15 uppercase tracking-wider">
          {table.getFilteredRowModel().rows.length} {table.getFilteredRowModel().rows.length !== 1 ? 'Records' : 'Record'}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-surface-800/80 bg-surface-950/30 dark:bg-surface-900/30 backdrop-blur-sm shadow-inner shadow-black/[0.02]">
        <table className="w-full text-sm">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-surface-800/80">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getCanSort() ? header.column.getToggleSortingHandler() : undefined}
                    className={`px-5 py-4 text-left text-[10px] font-black uppercase tracking-[0.1em] text-surface-500 dark:text-surface-400 bg-surface-100/10 dark:bg-surface-900/60 ${
                      header.column.getCanSort() ? 'cursor-pointer select-none hover:text-primary-600 dark:hover:text-surface-200 transition-colors' : ''
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getIsSorted() === 'asc' && <span className="text-primary-500 text-sm animate-in fade-in slide-in-from-bottom-1 duration-200">↑</span>}
                      {header.column.getIsSorted() === 'desc' && <span className="text-primary-500 text-sm animate-in fade-in slide-in-from-top-1 duration-200">↓</span>}
                      {header.column.getCanSort() && !header.column.getIsSorted() && (
                        <span className="text-surface-400 dark:text-surface-600 text-xs opacity-50">⇅</span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-surface-800/50">
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-5 py-24 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-surface-100 dark:bg-surface-800/50 flex items-center justify-center text-surface-400 dark:text-surface-600">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-base font-bold text-surface-400 dark:text-surface-500">No records found</p>
                      <p className="text-xs text-surface-500 dark:text-surface-600 font-medium">Add entries using the configuration form above</p>
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-surface-100/50 dark:hover:bg-surface-800/30 transition-all duration-150 group">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-5 py-4 text-surface-200 dark:text-surface-200 whitespace-nowrap font-medium text-sm transition-colors group-hover:text-surface-50">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {table.getPageCount() > 1 && (
        <div className="flex items-center justify-between pt-2">
          <p className="text-xs font-bold text-surface-500 uppercase tracking-widest">
            Page {table.getState().pagination.pageIndex + 1} <span className="mx-1 text-surface-700">/</span> {table.getPageCount()}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-surface-950 dark:bg-surface-800/50 border border-surface-700/80 text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700/50 hover:text-surface-50 dark:hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer shadow-sm dark:shadow-none"
            >
              ← Prev
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-surface-950 dark:bg-surface-800/50 border border-surface-700/80 text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700/50 hover:text-surface-50 dark:hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer shadow-sm dark:shadow-none"
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
