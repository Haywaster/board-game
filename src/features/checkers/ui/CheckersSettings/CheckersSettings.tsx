import { FC } from 'react';
import Modal from 'shared/ui/Modal/Modal.tsx';

interface IProps {
	openModal: boolean
	closeHandler: () => void
}

const CheckersSettings: FC<IProps> = ({openModal, closeHandler}) => {
	return (
		<Modal isOpen={openModal} onClose={closeHandler}>
			<h2>settings</h2>
		</Modal>
	);
};

export default CheckersSettings;