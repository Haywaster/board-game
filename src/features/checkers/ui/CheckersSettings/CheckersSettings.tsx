import { FC, useCallback } from 'react';
import Modal from 'shared/ui/Modal/Modal.tsx';
import Switch from 'shared/ui/Switch/Switch.tsx';
import module from './CheckersSettings.module.scss';
import { useRules } from 'app/providers/RulesProvider';

interface IProps {
	openModal: boolean
	closeHandler: () => void
}

const CheckersSettings: FC<IProps> = ({openModal, closeHandler}) => {
	const {checkersRules, setCheckersRules} = useRules()
	
	const onChangeHandler = useCallback(({ id, checked }: { id: string; checked: boolean }): void => {
		setCheckersRules((prev) => prev.map((item) => item.id === id ? {...item, checked} : item))
	}, [setCheckersRules])
	
	return (
		<Modal isOpen={openModal} onClose={closeHandler}>
			<h2>game settings</h2>
			<div className={module.switchWrapper}>
				{checkersRules.map((item) => (
					<Switch
						key={item.id}
						id={item.id}
						label={item.label}
						initialChecked={item.checked}
						onChange={onChangeHandler}
					/>
				))}
			</div>
		</Modal>
	);
};

export default CheckersSettings;