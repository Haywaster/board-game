import type { IFigureAction, } from 'entities/Cell/model/types.ts';
import { useFigure } from 'app/providers/FigureProvider';
import { calcMoveFigureAction } from '../utils/calcMoveFigureAction.ts';
import { calcKillFigureAction } from '../utils/calcKillFigureAction.ts';
import { useCallback } from 'react';

export const useCalcFigureActions = () => {
  const { cells } = useFigure();
	
  const getFigureActions = useCallback((figureId: number): IFigureAction[] => {
    const actions: IFigureAction[] = [];
    const findCell = cells.find(cell => cell.figure?.id === figureId);
    const findFigure = findCell?.figure;
		
    if (findCell && findFigure) {
      const moveAction = calcMoveFigureAction(cells, findFigure);
      const killAction = calcKillFigureAction(cells, findFigure, findCell);
			
      if (moveAction) {
        actions.push(moveAction);
      }
			
      if (killAction) {
        actions.push(killAction);
      }
    }
		
    return actions;
  }, [cells]);
	
  return { getFigureActions };
};