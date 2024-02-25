import { FC } from 'react';
import { classNames } from 'shared/libs/classNames.ts';
import module from './Navbar.module.scss'
import Button from 'shared/ui/Button/Button.tsx';
import { useTheme } from 'app/providers/ThemeProvider';

interface IProps {
	className?: string
}

export const Navbar: FC<IProps> = ({className}) => {
	const { theme, toggleTheme } = useTheme();
	
	return (
		<nav className={classNames(module.Navbar, {}, [className])}>
			<h1>Welcome to checkers!</h1>
			<Button onClick={ toggleTheme }>{ theme }</Button>
		</nav>
	);
};