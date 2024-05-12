import type { Dispatch, SetStateAction } from 'react';
import { createContext } from 'react';
import type { ModalName } from '../ui/ModalProvider.tsx';

export interface ModalContextProps {
	currentModal: ModalName | null;
  setCurrentModal: Dispatch<SetStateAction<ModalName | null>>;
  prevModal: ModalName | null;
}

export const ModalContext = createContext<ModalContextProps | null>(null);
