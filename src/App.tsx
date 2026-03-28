import { useState, useCallback } from 'react';
import { Layout, FormRenderer, DataTable, SectionCard, Toast } from './components';
import { useAppContext } from './context';
import { userFormSchema, userTableConfig } from './config';
import type { FormValues } from './types';

function AppContent() {
  const { state, addEntry, deleteEntry } = useAppContext();
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info'; visible: boolean }>({
    message: '',
    type: 'success',
    visible: false,
  });

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type, visible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3000);
  }, []);

  const handleFormSubmit = useCallback(
    (values: FormValues) => {
      addEntry(values);
      showToast('Entry added successfully!', 'success');
      console.log('🚀 SUBMITTED FORM DATA:', values);
      console.table(values);
    },
    [addEntry, showToast],
  );

  const handleDeleteRow = useCallback(
    (index: number) => {
      deleteEntry(index);
      showToast('Entry deleted', 'info');
    },
    [deleteEntry, showToast],
  );

  return (
    <Layout>
      <div className="text-center py-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-300 text-xs font-bold border border-primary-500/15 mb-5 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
          Configuration-Driven Architecture
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold font-display text-surface-50 tracking-tight leading-tight">
          Dynamic{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-primary-500 to-accent-600 dark:from-primary-400 dark:via-primary-300 dark:to-accent-400">
            Form & Table
          </span>{' '}
          Engine
        </h1>
        <p className="mt-6 text-surface-500 dark:text-surface-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed font-medium">
          Add entries with the form, view them in the table below. Modify JSON schemas to change UI without touching components.
        </p>
        <div className="flex items-center justify-center gap-6 mt-8">
          {[
            { label: `${userFormSchema.fields.length} Fields`, color: 'bg-primary-500' },
            { label: `${userTableConfig.columns.length} Columns`, color: 'bg-accent-500' },
            { label: `${state.data.length} Records`, color: 'bg-warning-500' },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-2.5 text-xs font-bold text-surface-500 dark:text-surface-400 uppercase tracking-wider">
              <span className={`w-2.5 h-2.5 rounded-full ${stat.color} shadow-sm`} />
              {stat.label}
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <SectionCard
        title="Add New Entry"
        subtitle="Fill the form to add a new record to the dataset"
        icon={
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        }
      >
        <FormRenderer schema={userFormSchema} onSubmit={handleFormSubmit} />
      </SectionCard>

      {/* Table */}
      <SectionCard
        title="Data Records"
        subtitle="View, sort, filter, and manage submitted entries"
        icon={
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        }
      >
        <DataTable config={userTableConfig} data={state.data} onDeleteRow={handleDeleteRow} />
      </SectionCard>

      <Toast message={toast.message} type={toast.type} visible={toast.visible} />
    </Layout>
  );
}

export default function App() {
  return <AppContent />;
}
