import type { IActiveFigure, ICell } from 'entities/Cell';
import { FC, PropsWithChildren, useCallback, useMemo, useState } from 'react';
import { FigureContext } from '../libs/FigureContext.ts';
import { getCells } from 'features/checkers';

export const FigureProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isWhiteStep, setIsWhiteStep] = useState<boolean>(true);
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

  const resetState = useCallback((): void => {
    setCells(getCells());
    setActiveFigure(null);
    setIsWhiteStep(true);
  }, []);

  return (
    <FigureContext.Provider value={
      {
        ...defaultActiveFigureValue,
        ...defaultCellsValue,
        ...defaultStepColor,
        resetState
      }
    }>
      { children }
    </FigureContext.Provider>
  );
};