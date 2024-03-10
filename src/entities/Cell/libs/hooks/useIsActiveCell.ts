import { useFigure } from 'widgets/Board/providers/FigureProvider';

export const useIsActiveCell = (cellId: number) => {
	const { activeFigure } = useFigure();

	return !!activeFigure?.actions.find(action => {
		switch (action.type) {
			case 'move':
				return action.cells.find(cell => cell.id === cellId);
			case 'kill':
				return action.killOrder.find(order => order.cell.id === cellId);
			default:
				return false;
		}
	});
};