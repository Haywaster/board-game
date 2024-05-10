import type { ICell, IFigure, IFigureMoveAction } from 'entities/Cell';
import { splitCellByDirections } from './common/splitCellByDirections.ts'
import { sortCellsByFar } from './common/sortCellsByFar.ts';
import { filterCellByDiagonal } from './common/filterCellByDiagonal.ts';

const commonFigureLogic = (cells: ICell[], findFigure: IFigure) => {
  const emptyNearNeighboursCell = cells.filter(cell => {
    const whiteCondition = findFigure.color === 'white' && cell.y > findFigure.y;
    const blackCondition = findFigure.color === 'black' && cell.y < findFigure.y;
    return !cell.figure && (
      whiteCondition || blackCondition) && Math.abs(cell.x - findFigure.x) === 1 &&
			Math.abs(cell.y - findFigure.y) === 1;
  });
	
  if (emptyNearNeighboursCell.length) {
    const action: IFigureMoveAction = {
      type: 'move',
      cells: emptyNearNeighboursCell
    };
		
    return action;
  }
};

const stainFigureLogic = (cells: ICell[], findFigure: IFigure) => {
  const diagonalCells = filterCellByDiagonal(cells, findFigure);
  const sortedCells = sortCellsByFar(diagonalCells, findFigure);
  const cellsByDirections = splitCellByDirections(sortedCells, findFigure);
  const emptyAllNeighboursCell: ICell[] = [];
	
  cellsByDirections.forEach(direction => {
    for (const cell of direction) {
      if (!cell.figure) {
        emptyAllNeighboursCell.push(cell);
      } else {
        break;
      }
    }
  });
	
  if (emptyAllNeighboursCell.length) {
    const action: IFigureMoveAction = {
      type: 'move',
      cells: emptyAllNeighboursCell
    };
		
    return action;
  }
};

export const calcMoveFigureAction = (cells: ICell[], findFigure: IFigure) => {
  if (!findFigure.isStain) {
    return commonFigureLogic(cells, findFigure);
  } else {
    return stainFigureLogic(cells, findFigure);
  }
};