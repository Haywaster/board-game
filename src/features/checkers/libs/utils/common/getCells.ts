import type { ICell, IFigure } from 'entities/Cell';

export const getCells = (): ICell[] => {
  const cells: Omit<ICell, 'id'>[] = [];
  let cellIdCounter = 0;
  let figureIdCounter = 0;
	
  for (let row = 1; row <= 8; row++) {
    for (let column = 1; column <= 8; column++) {
      const createFigure = (): IFigure | null => {
        if (row === 4 || row === 5 || (row + column) % 2 !== 0) {
          return null;
        }
				
        const figure: Omit<IFigure, 'id'> = {
          x: column,
          y: row,
          color: row <= 3 ? 'white' : 'black',
          isStain: false,
        };
				
        return {...figure, id: figureIdCounter++};
      };
			
      const cell: ICell = {
        x: column,
        y: row,
        id: cellIdCounter++,
        color: (row + column) % 2 !== 0 ? 'white' : 'black',
        figure: createFigure()
      };
			
      cells.push(cell);
    }
  }
	
  return cells.map((cell, index) => ({...cell, id: index}));
};
