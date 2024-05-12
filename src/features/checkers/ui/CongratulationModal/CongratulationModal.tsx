import type { FC } from 'react';
import Modal from 'shared/ui/Modal/Modal.tsx';
import module from './CongratulationModal.module.scss';
import { useCheckers } from 'app/providers/CheckersProvider';
import type { IFigure } from 'entities/Cell';
import Button, { ThemeButton } from 'shared/ui/Button/Button.tsx';
import { ModalName, useModal } from 'app/providers/ModalProvider';
import { memo } from 'react';

export const CongratulationModal: FC = memo(() => {
  const { currentModal, setCurrentModal } = useModal();
  const { isWhiteStep, resetState } = useCheckers();
  const whoHasWon: Capitalize<IFigure['color']> = isWhiteStep ? 'Black' : 'White';

  const restartGame = (): void => {
    setCurrentModal(null);
    resetState();
  };

  const changeSettings = (): void => {
    setCurrentModal(ModalName.SETTINGS);
  };

  const closeHandler = (): void => {
    setCurrentModal(null);
  };

  return (
    <Modal lazy isOpen={currentModal === ModalName.CONGRATULATION} onClose={closeHandler}>
      <h2>Game over</h2>
      <p>Congratulation! { whoHasWon } won!</p>
      <div className={module.BtnWrapper}>
        <Button theme={ThemeButton.PRIMARY} onClick={restartGame}>Restart</Button>
        <Button theme={ThemeButton.PRIMARY} onClick={changeSettings}>Change settings</Button>
      </div>
    </Modal>
  );
});