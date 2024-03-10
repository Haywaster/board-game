import { createContext, Dispatch, SetStateAction } from 'react';
import { type IActiveFigure } from 'entities/Figure';
import { type ICell } from 'entities/Cell';

export interface FigureContextProps {
	activeFigure: IActiveFigure | null
	setActiveFigure: Dispatch<SetStateAction<IActiveFigure| null>>
	cells: ICell[]
	setCells: Dispatch<SetStateAction<ICell[]>>
}

export const FigureContext = createContext<FigureContextProps | null>(null)
