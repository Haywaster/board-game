import type { FC } from 'react';
import Modal from 'shared/ui/Modal/Modal.tsx';
import module from './Congratulation.module.scss';
import { useCheckers } from 'app/providers/CheckersProvider';
import type { IFigure } from 'entities/Cell';
import Button, { ThemeButton } from 'shared/ui/Button/Button.tsx';

interface IProps {
	openModal: boolean
	closeHandler: () => void
}

const Congratulation: FC<IProps> = ({ openModal, closeHandler }) => {
  const { isWhiteStep, resetState } = useCheckers();
  const whoHasWon: Capitalize<IFigure['color']> = isWhiteStep ? 'Black' : 'White';

  const restartGame = (): void => {
    resetState();
  };

  return (
    <Modal isOpen={openModal} onClose={closeHandler}>
      <h2>Game over</h2>
      <p>Congratulation! { whoHasWon } won!</p>
      <div className={module.BtnWrapper}>
        <Button theme={ThemeButton.PRIMARY} onClick={restartGame}>Restart</Button>
        <Button theme={ThemeButton.PRIMARY}>Change settings</Button>
      </div>
    </Modal>
  );
};

export default Congratulation;