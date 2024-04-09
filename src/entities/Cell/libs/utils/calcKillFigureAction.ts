import type { ICell, IFigure, IFigureKillAction, IKillFigureAndCell } from '../../model/types.ts';
import { filterCellByDiagonal } from 'features/checkers/libs/filterCellByDiagonal.ts';
import { sortCellsByFar } from 'features/checkers/libs/sortCellsByFar.ts';
import { splitCellByDirections } from 'features/checkers/libs/splitCellByDirections.ts';

export const calcKillFigureAction = (cells: ICell[], findFigure: IFigure, findCell: ICell) => {
	const killOrderArr: IKillFigureAndCell[][] = [];
	const visitedCells = new Set<number>();
	
	const getOrderKill = (currentCell: ICell, orderArr: IKillFigureAndCell[] = []): void => {
		if (visitedCells.has(currentCell.id)) return;
		visitedCells.add(currentCell.id);
		
		const diagonalCells = filterCellByDiagonal(cells, currentCell);
		const sortedCells = sortCellsByFar(diagonalCells, currentCell);
		const cellsByDirections = splitCellByDirections(sortedCells, currentCell);
		
		cellsByDirections.forEach(direction => {
			const action = direction.reduce((acc, cell, index) => {
				if (cell.figure && cell.figure.color !== findFigure.color && index === 0) {
					acc.figure = cell.figure;
				} else if (acc.figure && !cell.figure && index === 1) {
					acc.cell = cell;
				}
				return acc;
			}, {} as IKillFigureAndCell);
			
			if (action.figure && action.cell && !visitedCells.has(action.cell.id)) {
				const newArr = [...orderArr, action];
				killOrderArr.push(newArr);
				getOrderKill(action.cell, newArr);
			}
		});
	};
	
	getOrderKill(findCell);
	
	if (killOrderArr.length) {
		const action: IFigureKillAction = {
			type: 'kill',
			killOrder: killOrderArr
		};
		
		return action;
	}
};