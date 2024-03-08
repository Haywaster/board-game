import { type ICell } from 'entities/Cell';
import { type IFigure } from 'entities/Figure';

export interface IData {
	cells: ICell[],
	figures: IFigure[]
}

export const getCells = (): IData => {
	const cells: Omit<ICell, 'id'>[] = [];
	const figures: Omit<IFigure, 'id'>[] = [];
	
	for (let row = 1; row <= 8; row++) {
		for (let column = 1; column <= 8; column++) {
			const cell: Omit<ICell, 'id'> = {
				x: column,
				y: row,
				color: (row + column) % 2 ? 'white' : 'black',
				isActive: false,
				isEmpty: row === 4 || row === 5 || (row + column) % 2 === 0
			};
			
			cells.push(cell);
			
			if (row === 4 || row === 5 || (row + column) % 2 === 0) {
				continue;
			}
			
			const figure: Omit<IFigure, 'id'> = {
				x: column,
				y: row,
				color: row <= 3 ? 'white' : 'black',
				isStain: false
			};
			
			figures.push(figure);
		}
	}
	
	return {
		cells: cells.map((cell, index) => ({...cell, id: index})),
		figures: figures.map((figure, index) => ({...figure, id: index}))
	};
}
