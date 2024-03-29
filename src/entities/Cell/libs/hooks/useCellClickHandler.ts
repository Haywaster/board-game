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
					const activeCell =
						action.killOrder
						.find(orderArr => orderArr
						.some(order => order.cell.id === id))
					
					if (activeCell) {
						const currentOrder = action.killOrder.find(orderArr => orderArr.find(order => order.cell.id === id));
						
						if (currentOrder) {
							const targetIndex = currentOrder.findIndex(item => item.cell.id === id);
							const killArr = targetIndex >= 0 ? currentOrder.slice(0, targetIndex + 1) : [...currentOrder];
							
							killFigure(killArr);
							moveFigure();
						}
					}
				}
			}
		});
	}
};