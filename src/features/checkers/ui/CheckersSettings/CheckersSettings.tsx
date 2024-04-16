import { FC } from 'react';
import Modal from 'shared/ui/Modal/Modal.tsx';
import Switch, { ISwitch } from 'shared/ui/Switch/Switch.tsx';
import module from './CheckersSettings.module.scss';

interface IProps {
	openModal: boolean
	closeHandler: () => void
}

const settingsArr: Omit<ISwitch, 'onChange'>[] = [
	{
		label: 'Require kill',
		id: 'require_kill',
		initialChecked: false
	},
	{
		label: 'Prompts',
		id: 'prompts',
		initialChecked: true
	},
]

const CheckersSettings: FC<IProps> = ({openModal, closeHandler}) => {
	return (
		<Modal isOpen={openModal} onClose={closeHandler}>
			<h2>game settings</h2>
			<div className={module.switchWrapper}>
				{settingsArr.map((item) => (
					<Switch
						key={item.id}
						id={item.id}
						label={item.label}
						initialChecked={item.initialChecked}
						onChange={e => console.log(e)}
					/>
				))}
			</div>
		</Modal>
	);
};

export default CheckersSettings;