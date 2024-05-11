import { useContext } from 'react';
import type { ThemeContextProps } from './ThemeContext.ts';
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from './ThemeContext.ts';

interface IUseTheme {
  theme: Theme
  toggleTheme: () => void
}

export const useTheme = (): IUseTheme => {
  const { theme, setTheme } = useContext(ThemeContext) as ThemeContextProps;

  const toggleTheme = (): void => {
    const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
    if (setTheme) {
      setTheme(newTheme);
    }
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
  };

  return { theme, toggleTheme };
};