import { FC, useState } from 'react';
import Button from 'shared/ui/Button/Button.tsx';
import { useTheme } from 'app/providers/ThemeProvider';
import { useFigure } from 'app/providers/FigureProvider';
import module from '../Navbar.module.scss';
import CheckersSettings from 'features/checkers/ui/CheckersSettings/CheckersSettings.tsx';
import Moon from 'shared/assets/moon.svg?react';
import Sun from 'shared/assets/sun.svg?react';
import Settings from 'shared/assets/settings.svg?react';
import Reload from 'shared/assets/reload.svg?react';

const NavButtons: FC = () => {
  const { resetState } = useFigure();
  const { theme, toggleTheme } = useTheme();
  const [openModal, setOpenModal] = useState(false);

  const closeHandler = () => {
    setOpenModal(false);
  };

  const openHandler = () => {
    setOpenModal(true);
  };

  const reloadGame = () => {
    resetState();
  };

  const themeText = theme === 'dark' ? <Moon/> : <Sun/>;

  return (
    <div className={ module.btnWrapper }>
      <Button onClick={ toggleTheme }>{ themeText }</Button>
      <Button onClick={ openHandler }><Settings/></Button>
      <Button onClick={ reloadGame }><Reload/></Button>
      <CheckersSettings openModal={ openModal } closeHandler={ closeHandler }/>
    </div>
  );
};

export default NavButtons;