import type { ICell, IFigure } from 'entities/Cell';

export const filterCellByDiagonal = (cells: ICell[], main: IFigure | ICell) => {
  return cells.filter(cell => {
    if ('figure' in main) {
      if (main.figure && cell.figure && main.figure.id === cell.figure.id) {
        return false;
      }
    } else {
      if (cell.figure && main.id === cell.figure.id) {
        return false;
      }
    }
    return Math.abs(cell.x - main.x) === Math.abs(cell.y - main.y);
  })
}