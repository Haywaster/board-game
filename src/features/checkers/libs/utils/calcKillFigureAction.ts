import type { ICell, IFigure, IFigureKillAction, IKillOrderSchema, IKillSchema } from 'entities/Cell/model/types.ts';
import { filterCellByDiagonal } from 'features/checkers/libs/utils/common/filterCellByDiagonal.ts';
import { sortCellsByFar } from 'features/checkers/libs/utils/common/sortCellsByFar.ts';
import { splitCellByDirections } from 'features/checkers/libs/utils/common/splitCellByDirections.ts';
import { removeRestCells } from 'features/checkers/libs/utils/common/removeRestCells.ts';

export const calcKillFigureAction = (cells: ICell[], findFigure: IFigure, findCell: ICell) => {
  const killOrderArr: IKillOrderSchema[] = [];
  const visitedCells = new Set<number>();
  
  const getOrderKill = (currentCell: ICell, orderArr: IKillSchema[], isStain: boolean): void => {
    if (visitedCells.has(currentCell.id)) return;
    visitedCells.add(currentCell.id);
		
    const diagonalCells = filterCellByDiagonal(cells, currentCell);
    const sortedCells = sortCellsByFar(diagonalCells, currentCell);
    const cellsByDirections = splitCellByDirections(sortedCells, currentCell);
    const interestedCells = removeRestCells(cellsByDirections);
    
    interestedCells.forEach(direction => {
      const previousCellId = [...visitedCells][[...visitedCells].length - 2];
      
      if (direction.some(cell => cell.id === previousCellId) || previousCellId === currentCell.id) {
        return;
      }
			
      let killFigure: IFigure | null = null
			
      direction.forEach((cell, index) => {
        if (!killFigure && cell.figure && cell.figure.color !== findFigure.color) {
          if (index === 0 || isStain && direction.slice(0, index).every(sliceCell => !sliceCell.figure)) {
            killFigure = cell.figure;
            return;
          }
        }
        if (killFigure && !cell.figure) {
          if (!isStain) {
            if (index === 1 && !visitedCells.has(cell.id) || [...visitedCells][0] === cell.id) {
              const potentialStain = cell.y === 8 && findFigure.color === 'white' || cell.y === 1 &&
								findFigure.color === 'black';
              const action: IKillSchema = {
                figure: killFigure, cell
              }
              const newArr = [...orderArr, action];
              const killOrder: IKillOrderSchema = {
                killOrder: newArr,
                makeStain: potentialStain
              };
              killOrderArr.push(killOrder);
              getOrderKill(cell, newArr, potentialStain);
            }
          } else {
            const action: IKillSchema = {
              figure: killFigure, cell
            }
            const newArr = [...orderArr, action];
            const killOrder: IKillOrderSchema = {
              killOrder: newArr,
              makeStain: true
            };
            killOrderArr.push(killOrder);
            getOrderKill(cell, newArr, true);
          }
        }
      });
    });
  };
	
  getOrderKill(findCell, [], findFigure.isStain);
  
  if (killOrderArr.length) {
    const action: IFigureKillAction = {
      type: 'kill',
      actions: killOrderArr
    };
		
    return action;
  }
};