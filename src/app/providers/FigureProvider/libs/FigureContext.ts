import { createContext, Dispatch, SetStateAction } from 'react';
import type { IActiveFigure, ICell } from 'entities/Cell';

export interface FigureContextProps {
	activeFigure: IActiveFigure | null
	setActiveFigure: Dispatch<SetStateAction<IActiveFigure| null>>
	cells: ICell[]
	setCells: Dispatch<SetStateAction<ICell[]>>
	isWhiteStep: boolean
	setIsWhiteStep: Dispatch<SetStateAction<boolean>>
}

export const FigureContext = createContext<FigureContextProps | null>(null)
