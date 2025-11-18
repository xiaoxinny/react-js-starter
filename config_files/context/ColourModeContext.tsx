import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import type { PaletteMode } from '@mui/material';
import { getTheme } from '../theme';

type ColorModeContextValue = {
  mode: PaletteMode;
  setMode: (mode: PaletteMode) => void;
  toggleMode: () => void;
};

const ColorModeContext = createContext<ColorModeContextValue | undefined>(
  undefined
);

const STORAGE_KEY = 'color-mode';

function readInitialMode(): PaletteMode | null {
  try {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
    const prefersDark =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  } catch {
    return null;
  }
}

export const ColorModeProvider: React.FC<
  React.PropsWithChildren<Record<string, unknown>>
> = ({ children }) => {
  // Start with a safe default to avoid SSR mismatch; then reconcile on mount.
  const [mode, setModeState] = useState<PaletteMode>(() => {
    const initial = readInitialMode();
    return initial ?? 'light';
  });

  useEffect(() => {
    // Keep localStorage in sync with user selection
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      // ignore write errors
    }
  }, [mode]);

  const setMode = (m: PaletteMode) => setModeState(m);

  const toggleMode = () =>
    setModeState((prev) => (prev === 'light' ? 'dark' : 'light'));

  const theme = useMemo(() => createTheme(getTheme(mode)), [mode]);

  const contextValue = useMemo<ColorModeContextValue>(
    () => ({ mode, setMode, toggleMode }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export function useColorMode(): ColorModeContextValue {
  const ctx = useContext(ColorModeContext);
  if (!ctx)
    throw new Error('useColorMode must be used within a ColorModeProvider');
  return ctx;
}

export default ColorModeContext;
