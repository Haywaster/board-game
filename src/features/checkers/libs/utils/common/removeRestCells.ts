import type { ICell } from 'entities/Cell';

export const removeRestCells = (cellsByDirections: ICell[][]): ICell[][] => {
  const interestedCells: ICell[][] = [];
  
  cellsByDirections.forEach(direction => {
    const cellsInDirection = [];
    let figureCount = 0;
		
    for (const cell of direction) {
      if (figureCount >= 2) {
        break;
      }
			
      if (cell.figure) {
        figureCount++;
      }
			
      cellsInDirection.push(cell);
    }
		
    interestedCells.push(cellsInDirection);
  });
	
  return interestedCells
}