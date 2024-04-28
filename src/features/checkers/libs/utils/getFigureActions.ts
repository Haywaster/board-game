import type { ICell, IFigureAction } from 'entities/Cell';
import type { CheckersRule } from '../../models/rules.ts';
import { CheckersRuleId } from '../../models/rules.ts';
import { calcMoveFigureAction } from './calcMoveFigureAction.ts';
import { calcKillFigureAction } from './calcKillFigureAction.ts';

export const getFigureActions = (cells: ICell[], figureId: number, checkersRules: CheckersRule[]): IFigureAction[] => {
  const actions: IFigureAction[] = [];
  const findCell = cells.find(cell => cell.figure?.id === figureId);
  const findFigure = findCell?.figure;
  
  if (findCell && findFigure) {
    const moveAction = calcMoveFigureAction(cells, findFigure);
    const killAction = calcKillFigureAction(cells, findCell, checkersRules);
    
    if (moveAction) {
      actions.push(moveAction);
    }
    
    if (killAction) {
      actions.push(killAction);
    }
    
    const isRequireKill = checkersRules.find(rule => rule.id === CheckersRuleId.REQUIRE_KILL)?.checked;
    
    if (isRequireKill) {
      const someKillAction = actions.some(action => action.type === 'kill');
      
      if (!someKillAction) {
        return actions;
      }
      
      return actions.filter(action => action.type === 'kill');
    }
  }
  
  return actions;
}