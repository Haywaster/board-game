import { classNames } from 'shared/libs/classNames.ts';
import { useTheme } from './providers/ThemeProvider';
import { Navbar } from 'widgets/Navbar';
import { Board } from 'widgets/Board';
import type { FC } from 'react';

const App: FC = () => {
  const { theme } = useTheme();

  return (
    <div className={ classNames('app', {}, [theme]) }>
      <Navbar/>
      <Board/>
    </div>
  );
};

export default App;
