import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import type { RowData } from '../types';
import { initialData } from '../config';

// ── State Shape ────────────────────────────────────────────────────────────────

type Theme = 'light' | 'dark';

interface AppState {
  data: RowData[];
  theme: Theme;
}

// ── Action Types ───────────────────────────────────────────────────────────────

type AppAction =
  | { type: 'ADD_ENTRY'; payload: RowData }
  | { type: 'DELETE_ENTRY'; payload: number }
  | { type: 'RESET_DATA' }
  | { type: 'TOGGLE_THEME' };

// ── Context Types ──────────────────────────────────────────────────────────────

interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  addEntry: (entry: RowData) => void;
  deleteEntry: (index: number) => void;
  resetData: () => void;
  toggleTheme: () => void;
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
    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
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
  // Initialize state from localStorage if available
  const getInitialState = (): AppState => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    return {
      data: initialData,
      theme: savedTheme || 'light'
    };
  };

  const [state, dispatch] = useReducer(appReducer, getInitialState());

  // Apply theme to document and persist
  useEffect(() => {
    const root = window.document.documentElement;
    if (state.theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', state.theme);
  }, [state.theme]);

  const addEntry = (entry: RowData) => {
    dispatch({ type: 'ADD_ENTRY', payload: entry });
  };

  const deleteEntry = (index: number) => {
    dispatch({ type: 'DELETE_ENTRY', payload: index });
  };

  const resetData = () => {
    dispatch({ type: 'RESET_DATA' });
  };

  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' });
  };

  return (
    <AppContext.Provider value={{ state, dispatch, addEntry, deleteEntry, resetData, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
}

// ── Custom Hook ────────────────────────────────────────────────────────────────

// ── Custom Hook ────────────────────────────────────────────────────────────────

export function useAppContext(): AppContextValue {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
