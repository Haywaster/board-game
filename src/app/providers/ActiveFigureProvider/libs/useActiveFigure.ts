import type { ActiveFigureContextProps } from './ActiveFigureContext.ts';
import { ActiveFigureContext } from './ActiveFigureContext.ts';
import { useContext } from 'react';

export const useActiveFigure = (): ActiveFigureContextProps => {
  const
    { activeFigure, setActiveFigure } = useContext(ActiveFigureContext) as ActiveFigureContextProps;

  return { activeFigure, setActiveFigure };
};