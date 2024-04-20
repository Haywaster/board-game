import { FC, PropsWithChildren, useMemo, useState } from 'react';
import { FigureContext } from '../libs/FigureContext.ts';
import { getCells } from 'features/checkers/libs/utils/common/getCells.ts';
import type { IActiveFigure, ICell } from 'entities/Cell';

export const FigureProvider: FC<PropsWithChildren> = ({ children }) => {
  const initialCells = useMemo(() => getCells(), []);
	
  const [isWhiteStep, setIsWhiteStep] = useState<boolean>(true);
  const [cells, setCells] = useState<ICell[]>(initialCells)
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
    }), [isWhiteStep])
	
  return (
    <FigureContext.Provider value={
      {
        ...defaultActiveFigureValue,
        ...defaultCellsValue,
        ...defaultStepColor
      }
    }>
      { children }
    </FigureContext.Provider>
  );
};