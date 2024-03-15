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
							killFigure(action.killOrder);
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