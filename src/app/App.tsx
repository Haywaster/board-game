import type { FC } from 'react';
import { Welcome } from 'features/welcome';
import { Navbar } from 'widgets/Navbar';
import { Board } from 'widgets/Board';
import { memo, useEffect, useState } from 'react';

const Game: FC = memo(() => (
  <>
    <Navbar/>
    <Board/>
  </>
));

const App: FC = () => {
  const [isWelcomeOpen, setIsWelcomeOpen] = useState<boolean>(false);
  const content = isWelcomeOpen ? <Welcome setIsWelcomeOpen={setIsWelcomeOpen}/> : <Game/>;

  useEffect(() => {
    const welcome = localStorage.getItem('isWelcomeOpen');

    if (!welcome?.length) {
      setIsWelcomeOpen(true);
    }
  }, []);

  return (
    <div className='app'>
      {content}
    </div>
  );
};

export default App;
