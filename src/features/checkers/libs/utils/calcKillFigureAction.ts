import type { ICell, IFigure, IFigureKillAction, IKillOrderSchema, IKillSchema } from 'entities/Cell/model/types.ts';
import type { CheckersRuleConfig } from 'app/providers/RulesProvider';
import { filterCellByDiagonal } from 'features/checkers/libs/utils/common/filterCellByDiagonal.ts';
import { sortCellsByFar } from 'features/checkers/libs/utils/common/sortCellsByFar.ts';
import { splitCellByDirections } from 'features/checkers/libs/utils/common/splitCellByDirections.ts';
import { removeRestCells } from 'features/checkers/libs/utils/common/removeRestCells.ts';

export const calcKillFigureAction = (cells: ICell[], findCell: ICell, clearRules: CheckersRuleConfig) => {
  const findFigure = findCell.figure as IFigure;
  const killOrderArr: IKillOrderSchema[] = [];
  const visitedCells: number[] = [];
  
  const prepareAction = (cell: ICell, killFigure: IFigure, orderArr: IKillSchema[], potentialStain: boolean) => {
    const action: IKillSchema = {
      figure: killFigure, cell
    };
    const newArr = [...orderArr, action];
    getOrderKill(cell, newArr, potentialStain);
  };
  
  const getOrderKill = (currentCell: ICell, orderArr: IKillSchema[], isStain: boolean): void => {
    if (visitedCells.includes(currentCell.id)) return;
    visitedCells.push(currentCell.id);
    const diagonalCells = filterCellByDiagonal(cells, currentCell);
    const sortedCells = sortCellsByFar(diagonalCells, currentCell);
    const cellsByDirections = splitCellByDirections(sortedCells, currentCell, clearRules);
    const interestedCells = removeRestCells(cellsByDirections);
    
    interestedCells.forEach(direction => {
      const previousCellId = visitedCells[visitedCells.length - 2];
      
      if (direction.some(cell => cell.id === previousCellId) || (
        previousCellId === currentCell.id && isStain)) {
        return;
      }
      
      let killFigure: IFigure | null = null;
      
      direction.forEach((cell, index) => {
        if (!killFigure && cell.figure && cell.figure.color !== findFigure.color) {
          if (index === 0 || isStain && direction.slice(0, index).every(sliceCell => !sliceCell.figure)) {
            killFigure = cell.figure;
            return;
          }
        }
        if (killFigure && !cell.figure) {
          if (!isStain) {
            if (index === 1) {
              const potentialStain = cell.y === 8 && findFigure.color === 'white' || cell.y === 1 &&
                findFigure.color === 'black';
              
              if (potentialStain) {
                visitedCells.pop();
                
                const action: IKillSchema = {
                  figure: killFigure, cell
                };
                
                const newArr = [...orderArr, action];
                
                if (killOrderArr.some(({ killOrder }) => killOrder.some(({ cell }) => cell.id === currentCell.id))) {
                  return;
                }
                
                const newKillOrder: IKillOrderSchema = {
                  killOrder: newArr,
                  makeStain: isStain
                };
                
                killOrderArr.push(newKillOrder);
                return getOrderKill(cell, [], true);
              }
              
              return prepareAction(cell, killFigure, orderArr, false);
            }
          } else {
            return prepareAction(cell, killFigure, orderArr, true);
          }
        }
      });
    });
    
    if (orderArr.length) {
      visitedCells.pop();
      
      if (killOrderArr.some(({ killOrder }) => killOrder.some(({ cell }) => cell.id === currentCell.id))) {
        return;
      }
      
      const newKillOrder: IKillOrderSchema = {
        killOrder: orderArr,
        makeStain: isStain
      };
      killOrderArr.push(newKillOrder);
    }
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