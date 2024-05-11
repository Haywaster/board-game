import { useTheme } from './providers/ThemeProvider';
import { Navbar } from 'widgets/Navbar';
import { Board } from 'widgets/Board';
import type { FC } from 'react';
import { useEffect } from 'react';

const App: FC = () => {
  const { theme } = useTheme();

  useEffect(() => {
    document.body.classList.forEach(item => {
      document.body.classList.remove(item);
    });

    document.body.classList.add(theme);
  }, [theme]);

  return (
    <div className='app'>
      <Navbar/>
      <Board/>
    </div>
  );
};

export default App;
