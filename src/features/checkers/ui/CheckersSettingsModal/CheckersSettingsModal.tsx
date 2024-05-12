import type { FC } from 'react';
import { useCallback } from 'react';
import Modal from 'shared/ui/Modal/Modal.tsx';
import Switch from 'shared/ui/Switch/Switch.tsx';
import module from './CheckersSettingsModal.module.scss';
import { useRules } from 'app/providers/RulesProvider';
import { ModalName, useModal } from 'app/providers/ModalProvider';
import Button, { ThemeButton } from 'shared/ui/Button/Button.tsx';
import { useCheckers } from 'app/providers/CheckersProvider';

export const CheckersSettingsModal: FC = () => {
  const { currentModal, setCurrentModal, prevModal } = useModal();
  const { resetState } = useCheckers();
  const { checkersRules, setCheckersRules } = useRules();

  const onChangeHandler = useCallback(({ id, checked }: { id: string; checked: boolean }): void => {
    setCheckersRules((prev) => prev.map((item) => item.id === id ? { ...item, checked } : item));
  }, [setCheckersRules]);

  const closeHandler = (): void => {
    setCurrentModal(null);
  };

  const restartGame = (): void => {
    resetState();
    closeHandler();
  };

  return (
    <Modal lazy isOpen={currentModal === ModalName.SETTINGS} onClose={closeHandler}>
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
};
