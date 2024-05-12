import { Navbar } from 'widgets/Navbar';
import { Board } from 'widgets/Board';
import type { FC } from 'react';

const App: FC = () => (
  <div className='app'>
    <Navbar/>
    <Board/>
  </div>
);

export default App;
