import { FigureContext, FigureContextProps } from './FigureContext.ts';
import { useContext } from 'react';

export const useFigure = () => {
  const
    {
      activeFigure,
      setActiveFigure,
      cells,
      setCells,
      isWhiteStep,
      setIsWhiteStep,
      resetState
    } = useContext(FigureContext) as FigureContextProps;

  return { activeFigure, setActiveFigure, cells, setCells, isWhiteStep, setIsWhiteStep, resetState };
};