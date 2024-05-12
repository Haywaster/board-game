import { useContext } from 'react';
import type { ModalContextProps } from './ModalContext.ts';
import { ModalContext } from './ModalContext.ts';

export const useModal = (): ModalContextProps => {
  const { currentModal, setCurrentModal, prevModal } = useContext(ModalContext) as ModalContextProps;
  return { currentModal, setCurrentModal, prevModal };
};