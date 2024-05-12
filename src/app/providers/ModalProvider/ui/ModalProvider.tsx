import type { FC, PropsWithChildren } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ModalContext } from '../libs/ModalContext.ts';

// eslint-disable-next-line react-refresh/only-export-components
export enum ModalName {
  CONGRATULATION = 'congratulation',
  SETTINGS = 'settings'
}

export const ModalProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentModal, setCurrentModal] = useState<ModalName | null>(null);
  const prevModal = useRef<ModalName | null>(null);

  const defaultModalValue = useMemo(() => ({
    currentModal, setCurrentModal
  }), [currentModal]);

  useEffect(() => {
    prevModal.current = currentModal;
  }, [currentModal]);

  return (
    <ModalContext.Provider value={ { ...defaultModalValue, prevModal: prevModal.current }}>
      { children }
    </ModalContext.Provider>
  );
};