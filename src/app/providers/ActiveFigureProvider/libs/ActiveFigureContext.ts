import type { IActiveFigure } from 'entities/Cell';
import type { Dispatch, SetStateAction } from 'react';
import { createContext } from 'react';

export interface ActiveFigureContextProps {
  activeFigure: IActiveFigure | null
  setActiveFigure: Dispatch<SetStateAction<IActiveFigure | null>>
}

export const ActiveFigureContext = createContext<ActiveFigureContextProps | null>(null);
