import { useCommitFigureActions } from './useCommitFigureActions.ts';
import { useFigure } from 'app/providers/FigureProvider';

export const useCellClickHandler = (id: number) => {
  const { moveFigure, killFigure } = useCommitFigureActions(id);
  const { activeFigure } = useFigure();
	
  return () => {
    activeFigure?.actions.find(action => {
      switch (action.type) {
      case 'move': {
        if (action.cells.some(cell => cell.id === id)) {
          moveFigure();
        }
        break;
      }
      case 'kill': {
        const activeCell = action.actions.find(({ killOrder }) => killOrder.some(order => order.cell.id === id));
					
        if (activeCell) {
          const currentOrder = action.actions.find(({ killOrder }) => killOrder.find(order => order.cell.id === id));
          if (currentOrder) {
            killFigure(currentOrder.killOrder);
            moveFigure(currentOrder.makeStain);
          }
        }
      }}
    });
  };
};