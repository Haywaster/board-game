import type { ICell, IFigure, IFigureKillAction, IKillOrderSchema, IKillSchema } from 'entities/Cell/model/types.ts';
import { filterCellByDiagonal } from 'features/checkers/libs/utils/filterCellByDiagonal.ts';
import { sortCellsByFar } from 'features/checkers/libs/utils/sortCellsByFar.ts';
import { splitCellByDirections } from 'features/checkers/libs/utils/splitCellByDirections.ts';
import { removeRestCells } from 'features/checkers/libs/utils/removeRestCells.ts';

export const calcKillFigureAction = (cells: ICell[], findFigure: IFigure, findCell: ICell) => {
	const killOrderArr: IKillOrderSchema[] = [];
	const visitedCells = new Set<number>();
	
	const getOrderKill = (currentCell: ICell, orderArr: IKillSchema[], isStain?: boolean): void => {
		if (visitedCells.has(currentCell.id)) return;
		visitedCells.add(currentCell.id);
		
		const diagonalCells = filterCellByDiagonal(cells, currentCell);
		const sortedCells = sortCellsByFar(diagonalCells, currentCell);
		const cellsByDirections = splitCellByDirections(sortedCells, currentCell);
		const interestedCells = removeRestCells(cellsByDirections);
		
		interestedCells.forEach(direction => {
			const pastDirection = [...visitedCells][[...visitedCells].length - 2];
			if (pastDirection) {
				const findDirection = direction.find(cell => cell.id === pastDirection);
				if (findDirection) return;
			}
			
			const action = {} as IKillSchema;
			
			direction.forEach((cell, index) => {
				if (!action.figure && cell.figure && cell.figure.color !== findFigure.color) {
					if (index === 0 || isStain && direction.slice(0, index).every(sliceCell => !sliceCell.figure)) {
						action.figure = cell.figure;
						return;
					}
				}
				if (action.figure && !cell.figure) {
					if (!isStain && index === 1) {
						action.cell = cell;
						
						if (!visitedCells.has(cell.id) || [...visitedCells][0] === cell.id) {
							const potentialStain = cell.y === 8 && findFigure.color === 'white' || cell.y === 1 &&
								findFigure.color === 'black';
							const newArr = [...orderArr, action];
							const killOrder: IKillOrderSchema = {
								killOrder: newArr,
								makeStain: potentialStain
							};
							killOrderArr.push(killOrder);
							getOrderKill(action.cell, newArr, potentialStain);
						}
					}
					
					if (isStain) {
						const newArr = [...orderArr, { ...action, cell }];
						const killOrder: IKillOrderSchema = {
							killOrder: newArr,
							makeStain: isStain
						};
						killOrderArr.push(killOrder);
						getOrderKill(cell, newArr);
					}
				}
			});
		});
	};
	
	getOrderKill(findCell, [], findFigure.isStain);
	
	if (killOrderArr.length) {
		const action: IFigureKillAction = {
			type: 'kill',
			actions: killOrderArr
		};
		
		return action;
	}
};