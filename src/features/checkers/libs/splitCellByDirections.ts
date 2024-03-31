import type { ICell, IFigure } from 'entities/Cell';

export const splitCellByDirections = (cells: ICell[], mainFigure: IFigure): ICell[][] => {
	const NEDirection: ICell[] = [];
	const NWDirection: ICell[] = [];
	const SWDirection: ICell[] = [];
	const SEDirection: ICell[] = [];
	
	for (const cell of cells) {
		if (Math.abs(cell.x - mainFigure.x) !== Math.abs(cell.y - mainFigure.y)) continue;
		
		if (cell.y > mainFigure.y && cell.x > mainFigure.x) {
			NEDirection.push(cell);
		}
		
		if (cell.y > mainFigure.y && cell.x < mainFigure.x) {
			NWDirection.push(cell);
		}
		
		if (cell.y < mainFigure.y && cell.x > mainFigure.x) {
			SWDirection.push(cell);
		}
		
		if (cell.y < mainFigure.y && cell.x < mainFigure.x) {
			SEDirection.push(cell);
		}
	}
	
	return [NEDirection, NWDirection, SWDirection, SEDirection].filter(item => item.length);
}