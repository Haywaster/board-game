import type { IFigureKillAction, IFigureMoveAction, IKillSchema } from 'entities/Cell';
import { useCallback } from 'react';
import { useFigure } from 'app/providers/FigureProvider';
import { useRules } from 'app/providers/RulesProvider';

export const useCellClickHandler = () => {
  const { clearRules } = useRules();
  const { activeFigure, setCells, setActiveFigure, setIsWhiteStep } = useFigure();
  
  const killAction = activeFigure?.actions.find((action): action is IFigureKillAction => action.type === 'kill');
  const moveAction = activeFigure?.actions.find((action): action is IFigureMoveAction => action.type === 'move');
  
  const moveFigure = useCallback((cellId: number, makeStain?: boolean): void => {
    if (activeFigure) {
      setCells(prev => prev.map(cell => {
        if (cell.figure && cell.figure.id === activeFigure.figure.id) {
          cell.figure = null;
        }
        
        if (!cell.figure && cell.id === cellId) {
          if (makeStain || !activeFigure.figure.isStain && (cell.y === 8 && activeFigure.figure.color === 'white') || (cell.y === 1 && activeFigure.figure.color === 'black')) {
            cell.figure = { ...activeFigure.figure, x: cell.x, y: cell.y, isStain: true };
            return cell;
          }
          cell.figure = { ...activeFigure.figure, x: cell.x, y: cell.y };
        }
        
        return cell;
      }));
      
      setIsWhiteStep(prev => !prev);
      setActiveFigure(null);
    }
  }, [activeFigure, setActiveFigure, setCells, setIsWhiteStep]);
  
  const killFigure = useCallback((killOrder: IKillSchema[]): void => {
    setCells(prev => prev.map(cell => {
      if (killOrder.find(schema => schema.figure.id === cell.figure?.id)) {
        return { ...cell, figure: null };
      }
      
      return cell;
    }));
  }, [setCells]);
  
  const onCellClick = useCallback((id: number): void => {
    if (moveAction && moveAction.cells.some(cell => cell.id === id)) {
      moveFigure(id);
      return;
    }
    
    if (killAction) {
      const chosenOrder = killAction.actions.find(({ killOrder }) => killOrder.some(({ cell }) => cell.id === id));
      if (chosenOrder) {
        const chosenCellIndex = chosenOrder.killOrder.findIndex(({ cell }) => cell.id === id);
        const slicedOrder = chosenOrder.killOrder.slice(0, chosenCellIndex + 1);
        
        if (!clearRules.kill_max_figure || clearRules.kill_max_figure && chosenCellIndex === chosenOrder.killOrder.length - 1) {
          killFigure(slicedOrder);
          moveFigure(id, chosenOrder.makeStain);
        }
      }
    }
  }, [clearRules.kill_max_figure, killAction, killFigure, moveAction, moveFigure]);
  
  const isActiveCell = useCallback((cellId: number): boolean => {
    let isKillActive = false;
    let isMoveActive = false;
    
    if (killAction) {
      isKillActive = killAction.actions.some(({ killOrder }) => killOrder.some(kill => kill.cell.id === cellId));
    }
    
    if (moveAction) {
      isMoveActive = moveAction.cells.some(cell => cell.id === cellId);
    }
    
    return isKillActive || isMoveActive;
  }, [killAction, moveAction]);
  
  const isSkipCell = useCallback((id: number): boolean => {
    if (clearRules.kill_max_figure && killAction) {
      const chosenOrder = killAction.actions.find(({ killOrder }) => killOrder.some(({ cell }) => cell.id === id));
      
      if (chosenOrder) {
        const chosenCellIndex = chosenOrder.killOrder.findIndex(({ cell }) => cell.id === id);
        
        return chosenCellIndex !== chosenOrder.killOrder.length - 1;
      }
    }
    
    return false;
  }, [clearRules.kill_max_figure, killAction]);
  
  return { onCellClick, isActiveCell, isSkipCell };
};