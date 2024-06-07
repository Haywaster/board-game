import type { FC } from 'react';
import { memo } from 'react';
import { classNames } from 'shared/libs/classNames.ts';
import { NavButtons } from './NavButtons/NavButtons.tsx';
import module from './Navbar.module.scss';

interface IProps {
	className?: string
}

export const Navbar: FC<IProps> = memo(({ className }) => {
  return (
    <nav className={classNames(module.Navbar, {}, [className])}>
      <h1>Checkers</h1>
      <NavButtons/>
    </nav>
  );
});