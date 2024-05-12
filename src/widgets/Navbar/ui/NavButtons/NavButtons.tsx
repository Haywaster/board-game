import type { FC } from 'react';
import Button from 'shared/ui/Button/Button.tsx';
import { useTheme } from 'app/providers/ThemeProvider';
import { useCheckers } from 'app/providers/CheckersProvider';
import { CheckersSettingsModal } from 'features/checkers';
import module from '../Navbar.module.scss';
import Moon from 'shared/assets/moon.svg?react';
import Sun from 'shared/assets/sun.svg?react';
import Settings from 'shared/assets/settings.svg?react';
import Reload from 'shared/assets/reload.svg?react';
import { ModalName, useModal } from 'app/providers/ModalProvider';
import { memo } from 'react';

export const NavButtons: FC = memo(() => {
  const { resetState, isFirstMoveMage } = useCheckers();
  const { setCurrentModal } = useModal();
  const { theme, toggleTheme } = useTheme();

  const openHandler = (): void => {
    setCurrentModal(ModalName.SETTINGS);
  };

  const reloadGame = (): void => {
    if (isFirstMoveMage) {
      resetState();
    }
  };

  const themeText = theme === 'dark' ? <Moon/> : <Sun/>;

  return (
    <div className={ module.btnWrapper }>
      <Button onClick={ toggleTheme }>{ themeText }</Button>
      <Button disabled={isFirstMoveMage} onClick={ openHandler }><Settings/></Button>
      <Button onClick={ reloadGame }><Reload/></Button>
      <CheckersSettingsModal/>
    </div>
  );
});
