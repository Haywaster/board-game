import type { IActiveFigure, ICell } from 'entities/Cell';
import type { Dispatch, SetStateAction } from 'react';
import { createContext } from 'react';

export interface CheckersContextProps {
	activeFigure: IActiveFigure | null
	setActiveFigure: Dispatch<SetStateAction<IActiveFigure| null>>
	cells: ICell[]
	setCells: Dispatch<SetStateAction<ICell[]>>
	isWhiteStep: boolean
	setIsWhiteStep: Dispatch<SetStateAction<boolean>>
  isFirstMoveMage: boolean
  setIsFirstMoveMage: Dispatch<SetStateAction<boolean>>
  resetState: () => void
}

export const CheckersContext = createContext<CheckersContextProps | null>(null);
