import type { FC } from 'react';
import welcome from 'shared/assets/welcome.png';
import { CheckersSettings } from 'features/checkers';
import Button, { ThemeButton } from 'shared/ui/Button/Button.tsx';
import module from './Welcome.module.scss';
import Switch from 'shared/ui/Switch/Switch.tsx';
import { useTheme } from 'app/providers/ThemeProvider';
import { memo } from 'react';

interface IWelcomeProps {
  setIsWelcomeOpen: (value: boolean) => void
}

export const Welcome: FC<IWelcomeProps> = memo(({ setIsWelcomeOpen }) => {
  const { theme, toggleTheme } = useTheme();

  const hideWelcome = (): void => {
    localStorage.setItem('isWelcomeOpen', 'false');
    setIsWelcomeOpen(false);
  };

  return (
    <div className={module.welcome}>
      <h1>Welcome to checkers!</h1>
      <h2>You can select the game settings and click on the "Play" button</h2>
      <section className={module.wrapper}>
        <div className={module.settings}>
          <CheckersSettings>
            <Switch onChange={toggleTheme} id='theme' label={`Theme: ${theme}`}/>
          </CheckersSettings>
          <Button theme={ThemeButton.PRIMARY} onClick={hideWelcome}>
            Play
          </Button>
        </div>
        <img src={welcome} alt='welcome'/>
      </section>
    </div>
  );
});