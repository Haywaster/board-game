import type { FC } from 'react';
import { Welcome } from 'features/welcome';
import { Navbar } from 'widgets/Navbar';
import { Board } from 'widgets/Board';
import { useEffect, useState } from 'react';

const Game: FC = () => (
  <>
    <Navbar/>
    <Board/>
  </>
);

const App: FC = () => {
  const [welcomeWasShown, setWelcomeWasShown] = useState<boolean>(false);
  const content = welcomeWasShown ? <Game/> : <Welcome setWelcomeWasShown={setWelcomeWasShown}/>;

  useEffect(() => {
    const welcome = localStorage.getItem('welcomeWasShown');

    if (welcome && welcome.length > 0) {
      setWelcomeWasShown(!!JSON.parse(welcome));
    }
  }, []);

  return (
    <div className='app'>
      {content}
    </div>
  );
};

export default App;
