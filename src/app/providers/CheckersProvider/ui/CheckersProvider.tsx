import type { ICell } from 'entities/Cell';
import type { FC, PropsWithChildren } from 'react';
import { useCallback, useMemo, useState } from 'react';
import { CheckersContext } from '../libs/CheckersContext.ts';
import { initialCells } from 'features/checkers/libs';

export const CheckersProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isWhiteStep, setIsWhiteStep] = useState<boolean>(true);
  const [isFirstMoveMage, setIsFirstMoveMage] = useState<boolean>(false);
  const [cells, setCells] = useState<ICell[]>(initialCells);

  const defaultValue = useMemo(() => (
    {
      cells,
      setCells,
      isWhiteStep,
      setIsWhiteStep,
      isFirstMoveMage,
      setIsFirstMoveMage,
      isGameOver,
      setIsGameOver
    }), [cells, isFirstMoveMage, isGameOver, isWhiteStep]);

  const resetState = useCallback((): void => {
    setCells(initialCells);
    setIsWhiteStep(true);
    setIsFirstMoveMage(false);
    setIsGameOver(false);
  }, []);

  return (
    <CheckersContext.Provider value={
      {
        ...defaultValue,
        resetState
      }
    }>
      { children }
    </CheckersContext.Provider>
  );
};