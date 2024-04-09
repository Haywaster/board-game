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
		
		for (const direction of cellsByDirections) {
			const action = {} as IKillFigureAndCell
			
			for (const cell of direction) {
				if (cell.figure && cell.figure.color !== findFigure.color && direction[0] === cell) {
					action.figure = cell.figure;
					continue;
				}
				if (action.figure && !cell.figure && direction[1] === cell) {
					action.cell = cell;
					
					if (!visitedCells.has(cell.id)) {
						const newArr = [...orderArr, action];
						killOrderArr.push(newArr);
						getOrderKill(action.cell, newArr);
					}
					break;
				}
			}
		}
	}
	
	getOrderKill(findCell)
	
	if (killOrderArr.length) {
		const action: IFigureKillAction = {
			type: 'kill',
			killOrder: killOrderArr
		};
		
		return action;
	}
};