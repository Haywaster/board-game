import type { ICell } from 'entities/Cell';
import type { Dispatch, SetStateAction } from 'react';
import { createContext } from 'react';

export interface CheckersContextProps {
	cells: ICell[]
	setCells: Dispatch<SetStateAction<ICell[]>>
	isWhiteStep: boolean
	setIsWhiteStep: Dispatch<SetStateAction<boolean>>
  isFirstMoveMage: boolean
  setIsFirstMoveMage: Dispatch<SetStateAction<boolean>>
  resetState: () => void
  isGameOver: boolean
  setIsGameOver: Dispatch<SetStateAction<boolean>>
}

export const CheckersContext = createContext<CheckersContextProps | null>(null);
