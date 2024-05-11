import type { CheckersContextProps } from './CheckersContext.ts';
import { CheckersContext } from './CheckersContext.ts';
import { useContext } from 'react';

export const useCheckers = (): CheckersContextProps => {
  const
    {
      activeFigure,
      setActiveFigure,
      cells,
      setCells,
      isWhiteStep,
      setIsWhiteStep,
      resetState,
      isFirstMoveMage,
      setIsFirstMoveMage,
      isGameOver,
      setIsGameOver
    } = useContext(CheckersContext) as CheckersContextProps;

  return {
    activeFigure,
    setActiveFigure,
    cells,
    setCells,
    isWhiteStep,
    setIsWhiteStep,
    resetState,
    isFirstMoveMage,
    setIsFirstMoveMage,
    isGameOver,
    setIsGameOver
  };
};