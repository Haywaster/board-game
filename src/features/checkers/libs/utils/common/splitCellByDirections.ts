import type { ICell, IFigure } from 'entities/Cell';
import type { CheckersRuleConfig } from 'app/providers/RulesProvider';

export const splitCellByDirections = (cells: ICell[],
  main: IFigure | ICell,
  clearRules?: CheckersRuleConfig): ICell[][] => {
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
  });
  if (!clearRules?.back_kill && 'figure' in main && !main.figure?.isStain) {
    if (main.figure?.color === 'white') {
      return [NEDirection, NWDirection].filter(item => item.length);
    } 
    return [SWDirection, SEDirection].filter(item => item.length);
  }
  
  return [NEDirection, NWDirection, SWDirection, SEDirection].filter(item => item.length);
};