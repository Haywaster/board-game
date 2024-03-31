import type { ICell, IFigure, IFigureMoveAction } from '../../model/types.ts';
import { calcDistance } from 'features/checkers/libs/calcDistance.ts';
import { splitCellByDirections } from 'features/checkers/libs/splitCellByDirections.ts';

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
	const getStainActiveCells = (): ICell[] => {
		const diagonalCells = cells.filter(cell => Math.abs(cell.x - findFigure.x) === Math.abs(cell.y - findFigure.y) &&
			cell.figure?.id !== findFigure.id);
		const sortedCells = diagonalCells.sort((a, b) => {
			const distanceA = calcDistance(findFigure.x, findFigure.y, a.x, a.y);
			const distanceB = calcDistance(findFigure.x, findFigure.y, b.x, b.y);
			return distanceA - distanceB;
		});
		
		const cellsByDirections = splitCellByDirections(sortedCells, findFigure);
		const activeCells: ICell[] = [];
		
		cellsByDirections.forEach(direction => {
			for (const cell of direction) {
				if (!cell.figure) {
					activeCells.push(cell);
				} else {
					break;
				}
			}
		});
		
		return activeCells;
	};
	
	const emptyAllNeighboursCell: ICell[] = getStainActiveCells();
	
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