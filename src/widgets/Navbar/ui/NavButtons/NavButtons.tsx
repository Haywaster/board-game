import { FC, useCallback, useState } from 'react';
import Button from 'shared/ui/Button/Button.tsx';
import { useTheme } from 'app/providers/ThemeProvider';
import module from '../Navbar.module.scss'
import CheckersSettings from 'features/checkers/ui/CheckersSettings/CheckersSettings.tsx';

const NavButtons: FC = () => {
	const { theme, toggleTheme } = useTheme();
	const [openModal, setOpenModal] = useState(false)
	
	const closeHandler = useCallback(() => {
		setOpenModal(false)
	}, [])
	
	const openHandler = useCallback(() => {
		setOpenModal(true)
	}, [])
	
	return (
		<div className={module.btnWrapper}>
			<Button onClick={ toggleTheme }>{ theme }</Button>
			<Button onClick={ openHandler }>settings</Button>
			<CheckersSettings openModal={openModal} closeHandler={closeHandler} />
		</div>
	);
};

export default NavButtons;