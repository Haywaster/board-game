import type { ICell, IFigure } from 'entities/Cell';

export const splitCellByDirections = (cells: ICell[], main: IFigure | ICell): ICell[][] => {
  const NEDirection: ICell[] = [];
  const NWDirection: ICell[] = [];
  const SWDirection: ICell[] = [];
  const SEDirection: ICell[] = [];
	
  cells.forEach(cell => {
    if (cell.y > main.y && cell.x > main.x) {
      NEDirection.push(cell);
    }
		
    if (cell.y > main.y && cell.x < main.x) {
      NWDirection.push(cell);
    }
		
    if (cell.y < main.y && cell.x > main.x) {
      SWDirection.push(cell);
    }
		
    if (cell.y < main.y && cell.x < main.x) {
      SEDirection.push(cell);
    }
  })
	
  return [NEDirection, NWDirection, SWDirection, SEDirection].filter(item => item.length);
}