import type { ICell, IFigure } from 'entities/Cell';
import { calcDistance } from './calcDistance.ts';

export const sortCellsByFar = (cells: ICell[], main: IFigure | ICell): ICell[] => {
  return cells.sort((a, b) => {
    const distanceA = calcDistance(main.x, main.y, a.x, a.y);
    const distanceB = calcDistance(main.x, main.y, b.x, b.y);
    return distanceA - distanceB;
  });
}