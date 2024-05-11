import { classNames } from 'shared/libs/classNames.ts';
import { useTheme } from './providers/ThemeProvider';
import { Navbar } from 'widgets/Navbar';
import { Board } from 'widgets/Board';

const App = () => {
  const { theme } = useTheme();

  return (
    <div className={ classNames('app', {}, [theme]) }>
      <Navbar/>
      <Board/>
    </div>
  );
};

export default App;
