import { useFigure } from 'app/providers/FigureProvider';
import { useCallback } from 'react';
import { IKillSchema } from '../../../../entities/Cell';

export const useCellClickHandler = () => {
  const { activeFigure, setCells, setActiveFigure, setIsWhiteStep } = useFigure();
  
  const moveFigure = useCallback((cellId: number, makeStain?: boolean) => {
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
  
  const killFigure = useCallback((killOrder: IKillSchema[]) => {
    setCells(prev => prev.map(cell => {
      if (killOrder.find(schema => schema.figure.id === cell.figure?.id)) {
        return { ...cell, figure: null };
      }
      
      return cell;
    }));
  }, [setCells])
  
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
  
  const onCellClick = useCallback((id: number): void => {
    activeFigure?.actions.find(action => {
      switch (action.type) {
      case 'move': {
        if (action.cells.some(cell => cell.id === id)) {
          moveFigure(id);
        }
        break;
      }
      case 'kill': {
        const activeCell = action.actions.some(({ killOrder }) => killOrder.some(order => order.cell.id === id));
          
        if (activeCell) {
          const currentOrder = action.actions.find(({ killOrder }) => killOrder.some(order => order.cell.id === id));
            
          if (currentOrder) {
            killFigure(currentOrder.killOrder);
            moveFigure(id, currentOrder.makeStain);
          }
        }
      }
      }
    });
  }, [activeFigure?.actions, killFigure, moveFigure])
  
  return { onCellClick, isActiveCell };
};