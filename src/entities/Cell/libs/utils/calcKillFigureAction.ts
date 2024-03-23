import type { ICell, IFigure, IFigureKillAction, IKillFigureAndCell } from '../../model/types.ts';

export const calcKillFigureAction = (cells: ICell[], findFigure: IFigure, findCell: ICell) => {
	const killOrderArr: IKillFigureAndCell[][] = [];
	
	const getEnemyFigures = (cellActiveFigure: ICell, visitedCells: Set<ICell>): IFigure[] => {
		return cells
		.filter(cell => checkEnemyFigure(cell, cellActiveFigure) && !visitedCells.has(cell))
		.map(cell => cell.figure!);
	};
	
	const getActiveCells = (cellActiveFigure: ICell, visitedCells: Set<ICell>): ICell[] => {
		return cells.filter(cell => checkActiveCell(cell, cellActiveFigure) && !visitedCells.has(cell));
	};
	
	const checkEnemyFigure = (cell: ICell, cellActiveFigure: ICell): boolean => {
		return cell.figure! && cell.figure.color !== findFigure.color &&
			Math.abs(cell.x - cellActiveFigure.x) === 1 && Math.abs(cell.y - cellActiveFigure.y) === 1;
	};
	
	const checkActiveCell = (cell: ICell, cellActiveFigure: ICell): boolean => {
		return !cell.figure &&
			Math.abs(cell.x - cellActiveFigure.x) === 2 &&
			Math.abs(cell.y - cellActiveFigure.y) === 2;
	};
	
	const checkCellDistance = (figure: IFigure, cell: ICell): boolean => {
		return Math.abs(figure.x - cell.x) === 1 && Math.abs(figure.y - cell.y) === 1;
	};
	
	const getKillOrders = (
		cellActiveFigure: ICell,
		visitedCells: Set<ICell> = new Set(),
		tempOrderArr: IKillFigureAndCell[] = []): void => {
		
		if (visitedCells.has(cellActiveFigure)) {
			if (tempOrderArr.length > 0) killOrderArr.push([...tempOrderArr]);
			return;
		}
		
		visitedCells.add(cellActiveFigure);
		
		const enemyFigures = getEnemyFigures(cellActiveFigure, visitedCells);
		const activeCells = getActiveCells(cellActiveFigure, visitedCells);
		
		if (enemyFigures.length === 0 || activeCells.length === 0) {
			if (tempOrderArr.length > 0) killOrderArr.push([...tempOrderArr]);
			return;
		}
		
		enemyFigures.forEach(figure => {
			const findCell = activeCells.find(cell => checkCellDistance(figure, cell));
			
			if (figure && findCell && !visitedCells.has(findCell)) {
				const target: IKillFigureAndCell = { figure, cell: findCell };
				tempOrderArr.push(target);
				getKillOrders(findCell, new Set(visitedCells), tempOrderArr);
			}
		});
		
		if (tempOrderArr.length > 0 && visitedCells.size === 1) killOrderArr.push([...tempOrderArr]);
	};
	
	getKillOrders(findCell, new Set());
	
	if (killOrderArr.length) {
		const action: IFigureKillAction = {
			type: 'kill',
			killOrder: killOrderArr
		};
		
		return action;
	}
};