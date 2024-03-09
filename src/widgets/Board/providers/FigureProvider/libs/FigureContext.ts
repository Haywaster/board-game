import { createContext, Dispatch, SetStateAction } from 'react';
import { type IFigure } from 'entities/Figure';
import { type ICell } from 'entities/Cell';

export interface FigureContextProps {
	activeFigure: IFigure | null
	setActiveFigure: Dispatch<SetStateAction<IFigure| null>>
	cells: ICell[]
	setCells: Dispatch<SetStateAction<ICell[]>>
}

export const FigureContext = createContext<FigureContextProps | null>(null)
