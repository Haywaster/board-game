import { useFigureActions } from './useFigureActions.ts';
import { useIsActiveCell } from './useIsActiveCell.ts';
import { useFigure } from 'widgets/Board/providers/FigureProvider';

export const useHandleActiveCell = (id: number) => {
	const { activeFigure } = useFigure();
	const { moveFigure, killFigure } = useFigureActions(id);
	const active = useIsActiveCell(id);
	
	return () => {
		if (activeFigure && active) {
			activeFigure.actions.find(action => {
				switch (action.type) {
					case 'move': {
						moveFigure();
						break;
					}
					case 'kill': {
						killFigure(action.killOrder);
						moveFigure();
						break;
					}
					default:
						break;
				}
			});
		}
	};
};