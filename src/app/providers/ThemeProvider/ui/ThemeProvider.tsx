import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from '../libs/ThemeContext.ts';
import { FC, PropsWithChildren, useMemo, useState } from 'react';

const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || Theme.LIGHT;

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState(defaultTheme);

  const defaultValue = useMemo(() => ({
    theme, setTheme
  }), [theme]);

  return (
    <ThemeContext.Provider value={defaultValue}>
      {children}
    </ThemeContext.Provider>
  );
};