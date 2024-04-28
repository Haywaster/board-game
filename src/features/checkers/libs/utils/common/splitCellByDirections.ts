import type { ICell, IFigure } from 'entities/Cell';
import type { CheckersRule } from '../../../models/rules.ts';
import { CheckersRuleId } from '../../../models/rules.ts';

export const splitCellByDirections = (cells: ICell[], main: IFigure | ICell, checkersRules?: CheckersRule[]): ICell[][] => {
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
	
  const backKill = checkersRules?.find(rule => rule.id === CheckersRuleId.BACK_KILL)?.checked
  
  if (!backKill && 'figure' in main && !main.figure?.isStain) {
    if (main.figure?.color === 'white') {
      return [NEDirection, NWDirection].filter(item => item.length);
    } else {
      return [SWDirection, SEDirection].filter(item => item.length);
    }
  }
  
  return [NEDirection, NWDirection, SWDirection, SEDirection].filter(item => item.length)
}