import type { ICell, IFigure, IFigureMoveAction } from '../../model/types.ts';

export const calcMoveFigureAction = (cells: ICell[], findFigure: IFigure) => {
	const emptyNearNeighboursCell = cells.filter(cell => {
		const whiteCondition = findFigure.color === 'white' && cell.y > findFigure.y;
		const blackCondition = findFigure.color === 'black' && cell.y < findFigure.y;
		return !cell.figure && (
				whiteCondition || blackCondition) && Math.abs(cell.x - findFigure.x) === 1 &&
			Math.abs(cell.y - findFigure.y) === 1;
	});
	
	if (emptyNearNeighboursCell.length) {
		const action: IFigureMoveAction = {
			type: 'move',
			cells: emptyNearNeighboursCell
		};
		
		return action;
	}
}