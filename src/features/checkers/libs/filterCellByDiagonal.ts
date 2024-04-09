import { ICell, IFigure } from 'entities/Cell';

export const filterCellByDiagonal = (cells: ICell[], main: IFigure | ICell) => {
	return cells.filter(cell => {
		const diagonalCondition = Math.abs(cell.x - main.x) === Math.abs(cell.y - main.y);
		
		if (diagonalCondition && cell.figure?.id !== main.id) {
			return true
		}
	})
}