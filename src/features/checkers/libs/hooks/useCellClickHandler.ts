import type { IFigureKillAction, IKillSchema } from 'entities/Cell';
import { useCallback } from 'react';
import { useFigure } from 'app/providers/FigureProvider';
import { useRules } from 'app/providers/RulesProvider';

export const useCellClickHandler = () => {
  const { clearRules } = useRules()
  const { activeFigure, setCells, setActiveFigure, setIsWhiteStep } = useFigure();
  
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
      
      setIsWhiteStep(prev => !prev)
      setActiveFigure(null);
    }
  }, [activeFigure, setActiveFigure, setCells, setIsWhiteStep])
  
  const killFigure = useCallback((killOrder: IKillSchema[]): void => {
    setCells(prev => prev.map(cell => {
      if (killOrder.find(schema => schema.figure.id === cell.figure?.id)) {
        return { ...cell, figure: null };
      }
      
      return cell;
    }));
  }, [setCells])
  
  const onCellClick = useCallback((id: number): void => {
    activeFigure?.actions.forEach(action => {
      switch (action.type) {
      case 'move': {
        if (action.cells.some(cell => cell.id === id)) {
          moveFigure(id);
        }
        break;
      }
      case 'kill': {
        const chosenOrder = action.actions.find(({ killOrder }) => killOrder.some(({ cell }) => cell.id === id));
        if (chosenOrder) {
          const chosenCellIndex = chosenOrder.killOrder.findIndex(({cell}) => cell.id === id)
          const slicedOrder = chosenOrder.killOrder.slice(0, chosenCellIndex + 1);
          
          if (!clearRules.kill_max_figure || clearRules.kill_max_figure && chosenCellIndex === chosenOrder.killOrder.length - 1) {
            killFigure(slicedOrder);
            moveFigure(id, chosenOrder.makeStain);
          }
        }
      }
      }
    });
  }, [activeFigure?.actions, clearRules.kill_max_figure, killFigure, moveFigure])
  
  const isActiveCell = useCallback((cellId: number): boolean => {
    if (!activeFigure) return false;
    
    return activeFigure.actions.some(action => {
      switch (action.type) {
      case 'move':
        return action.cells.some(cell => cell.id === cellId);
      case 'kill':
        return action.actions.some(({ killOrder }) => killOrder.some(kill => kill.cell.id === cellId));
      default:
        return false;
      }
    });
  }, [activeFigure])
  
  const isSkipCell = (id: number): boolean => {
    if (clearRules.kill_max_figure) {
      const killAction = activeFigure?.actions.find((action): action is IFigureKillAction => action.type === 'kill');
      
      if (killAction) {
        const chosenOrder = killAction.actions.find(({ killOrder }) => killOrder.some(({ cell }) => cell.id === id));
        
        if (chosenOrder) {
          const chosenCellIndex = chosenOrder.killOrder.findIndex(({ cell }) => cell.id === id)
          
          return chosenCellIndex !== chosenOrder.killOrder.length - 1;
        }
      }
    }
    
    return false
  }
  
  return { onCellClick, isActiveCell, isSkipCell };
};