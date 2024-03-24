import type { ICell, IFigure, IFigureMoveAction } from '../../model/types.ts';

const commonFigureLogic = (cells: ICell[], findFigure: IFigure) => {
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
};

const stainFigureLogic = (cells: ICell[], findFigure: IFigure) => {
	const emptyAllNeighboursCell: ICell[] = [];
	
	for (const cell of cells) {
		if (!cell.figure && Math.abs(cell.x - findFigure.x) === Math.abs(cell.y - findFigure.y)) {
			const neighboursCell = cells.filter(neighbour => Math.abs(neighbour.x - cell.x) === 1 &&
				Math.abs(neighbour.y - cell.y) === 1);
			
			if (neighboursCell.some(c => c.figure && c.figure.id !== findFigure.id && Math.abs(c.x - cell.x) === 1 &&
				Math.abs(c.y - cell.y) === 1 && Math.abs(findFigure.x - cell.x) > Math.abs(findFigure.x - c.x) &&
				Math.abs(findFigure.y - cell.y) > Math.abs(findFigure.y - c.y))) {
				continue;
			}
			
			emptyAllNeighboursCell.push(cell);
		}
	}
	
	if (emptyAllNeighboursCell.length) {
		const action: IFigureMoveAction = {
			type: 'move',
			cells: emptyAllNeighboursCell
		};
		
		return action;
	}
};

export const calcMoveFigureAction = (cells: ICell[], findFigure: IFigure) => {
	if (!findFigure.isStain) {
		return commonFigureLogic(cells, findFigure);
	} else {
		return stainFigureLogic(cells, findFigure);
	}
};