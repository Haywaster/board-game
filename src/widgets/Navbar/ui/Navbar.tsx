import { FC, memo } from 'react';
import { classNames } from 'shared/libs/classNames.ts';
import module from './Navbar.module.scss';
import NavButtons from './NavButtons/NavButtons.tsx';

interface IProps {
	className?: string
}

export const Navbar: FC<IProps> = memo(({ className }) => {
  return (
    <nav className={classNames(module.Navbar, {}, [className])}>
      <h1>Welcome to checkers!</h1>
      <NavButtons/>
    </nav>
  );
});