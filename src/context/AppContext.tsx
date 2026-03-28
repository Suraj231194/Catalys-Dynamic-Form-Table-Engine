import { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { RowData } from '../types';
import { initialData } from '../config';

// ── State Shape ────────────────────────────────────────────────────────────────

interface AppState {
  data: RowData[];
}

// ── Action Types ───────────────────────────────────────────────────────────────

type AppAction =
  | { type: 'ADD_ENTRY'; payload: RowData }
  | { type: 'DELETE_ENTRY'; payload: number }
  | { type: 'RESET_DATA' };

// ── Context Types ──────────────────────────────────────────────────────────────

interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  addEntry: (entry: RowData) => void;
  deleteEntry: (index: number) => void;
  resetData: () => void;
}

// ── Reducer ────────────────────────────────────────────────────────────────────

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'ADD_ENTRY':
      return { ...state, data: [...state.data, action.payload] };
    case 'DELETE_ENTRY':
      return {
        ...state,
        data: state.data.filter((_, index) => index !== action.payload),
      };
    case 'RESET_DATA':
      return { ...state, data: initialData };
    default:
      return state;
  }
};

// ── Context Creation ───────────────────────────────────────────────────────────

const AppContext = createContext<AppContextValue | undefined>(undefined);

// ── Provider Component ─────────────────────────────────────────────────────────

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(appReducer, { data: initialData });

  const addEntry = (entry: RowData) => {
    dispatch({ type: 'ADD_ENTRY', payload: entry });
  };

  const deleteEntry = (index: number) => {
    dispatch({ type: 'DELETE_ENTRY', payload: index });
  };

  const resetData = () => {
    dispatch({ type: 'RESET_DATA' });
  };

  return (
    <AppContext.Provider value={{ state, dispatch, addEntry, deleteEntry, resetData }}>
      {children}
    </AppContext.Provider>
  );
}

// ── Custom Hook ────────────────────────────────────────────────────────────────

export function useAppContext(): AppContextValue {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
