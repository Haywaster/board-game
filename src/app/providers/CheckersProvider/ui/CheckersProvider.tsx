import type { IActiveFigure, ICell } from 'entities/Cell';
import type { FC, PropsWithChildren } from 'react';
import { useCallback, useMemo, useState } from 'react';
import { CheckersContext } from '../libs/CheckersContext.ts';
import { getCells } from 'features/checkers';

export const CheckersProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isWhiteStep, setIsWhiteStep] = useState<boolean>(true);
  const [isFirstMoveMage, setIsFirstMoveMage] = useState<boolean>(false);
  const [cells, setCells] = useState<ICell[]>(getCells());
  const [activeFigure, setActiveFigure] = useState<IActiveFigure | null>(null);

  const defaultActiveFigureValue = useMemo(() => (
    {
      activeFigure, setActiveFigure
    }), [activeFigure]);

  const defaultCellsValue = useMemo(() => (
    {
      cells, setCells
    }), [cells]);

  const defaultStepColor = useMemo(() => (
    {
      isWhiteStep, setIsWhiteStep
    }), [isWhiteStep]);

  const defaultFirstMoveMage = useMemo(() => (
    {
      isFirstMoveMage, setIsFirstMoveMage
    }), [isFirstMoveMage]);

  const defaultIsGameOver = useMemo(() => (
    {
      isGameOver, setIsGameOver
    }), [isGameOver]);

  const resetState = useCallback((): void => {
    setCells(getCells());
    setActiveFigure(null);
    setIsWhiteStep(true);
    setIsFirstMoveMage(false);
    setIsGameOver(false);
  }, []);

  return (
    <CheckersContext.Provider value={
      {
        ...defaultActiveFigureValue,
        ...defaultCellsValue,
        ...defaultStepColor,
        ...defaultFirstMoveMage,
        ...defaultIsGameOver,
        resetState
      }
    }>
      { children }
    </CheckersContext.Provider>
  );
};