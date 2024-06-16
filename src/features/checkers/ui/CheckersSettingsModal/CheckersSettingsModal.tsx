import type { FC } from 'react';
import Modal from 'shared/ui/Modal/Modal.tsx';
import module from './CheckersSettingsModal.module.scss';
import { ModalName, useModal } from 'app/providers/ModalProvider';
import Button, { ThemeButton } from 'shared/ui/Button/Button.tsx';
import { useCheckers } from 'app/providers/CheckersProvider';
import { CheckersSettings } from '../CheckersSettings/CheckersSettings.tsx';
import { memo } from 'react';
import { useActiveFigure } from '../../../../app/providers';

export const CheckersSettingsModal: FC = memo(() => {
  const { currentModal, setCurrentModal, prevModal } = useModal();
  const resetState = useCheckers().resetState;
  const setActiveFigure = useActiveFigure().setActiveFigure;

  const closeHandler = (): void => {
    setCurrentModal(null);
  };

  const restartGame = (): void => {
    resetState();
    closeHandler();
    setActiveFigure(null);
  };

  return (
    <Modal className={module.settingsModal} isOpen={currentModal === ModalName.SETTINGS} onClose={closeHandler}>
      <h2>Game settings</h2>
      <CheckersSettings/>
      {prevModal === ModalName.CONGRATULATION && (
        <Button
          className={module.startGameBtn}
          theme={ThemeButton.PRIMARY}
          onClick={restartGame}>
          Start new game
        </Button>
      )}
    </Modal>
  );
});
