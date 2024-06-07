import type { FC } from 'react';
import welcome from 'shared/assets/welcome.webp';
import { CheckersSettings } from 'features/checkers';
import Button, { ThemeButton } from 'shared/ui/Button/Button.tsx';
import module from './Welcome.module.scss';
import Switch from 'shared/ui/Switch/Switch.tsx';
import { useTheme } from 'app/providers/ThemeProvider';

interface IWelcomeProps {
  setWelcomeWasShown: (value: boolean) => void
}

export const Welcome: FC<IWelcomeProps> = ({ setWelcomeWasShown }) => {
  const { theme, toggleTheme } = useTheme();

  const hideWelcome = (): void => {
    localStorage.setItem('welcomeWasShown', 'true');
    setWelcomeWasShown(true);
  };

  return (
    <div className={module.welcome}>
      <h1>Welcome to checkers!</h1>
      <section className={module.wrapper}>
        <aside>
          <img src={welcome} alt='welcome'/>
          <p>To start your first game, select the settings and click on the "Play" button</p>
        </aside>
        <div className={module.settings}>
          <CheckersSettings>
            <Switch onChange={toggleTheme} id='theme' label={`Theme: ${theme}`}/>
          </CheckersSettings>
          <Button theme={ThemeButton.PRIMARY} onClick={hideWelcome}>
            Play
          </Button>
        </div>
      </section>
    </div>
  );
};