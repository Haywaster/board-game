import { useFigureActions } from './useFigureActions.ts';
import { useIsActiveCell } from 'entities/Cell/libs/hooks/useIsActiveCell.ts';
import { useFigure } from 'app/providers/FigureProvider';

export const useHandleActiveCell = (id: number) => {
	const { activeFigure } = useFigure();
	const { moveFigure, killFigure } = useFigureActions(id);
	const active = useIsActiveCell(id);
	
	return () => {
		if (activeFigure && active) {
			activeFigure.actions.find(action => {
				switch (action.type) {
					case 'move': {
						if (action.cells.find(cell => cell.id === id)) {
							moveFigure();
						}
						break;
					}
					case 'kill': {
						if (action.killOrder.find(order => order.cell.id === id)) {
							const targetIndex = action.killOrder.findIndex(item => item.cell.id === id);
							const killArr = targetIndex >= 0 ? action.killOrder.slice(0, targetIndex + 1) : [...action.killOrder];
							
							killFigure(killArr);
							moveFigure();
						}
						break;
					}
					default:
						break;
				}
			});
		}
	};
};