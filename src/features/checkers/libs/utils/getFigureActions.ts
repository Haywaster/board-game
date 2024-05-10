import type { ICell, IFigureAction } from 'entities/Cell';
import type { CheckersRuleConfig } from 'app/providers/RulesProvider';
import { calcMoveFigureAction } from './calcMoveFigureAction.ts';
import { calcKillFigureAction } from './calcKillFigureAction.ts';

export const getFigureActions = (cells: ICell[], figureId: number, clearRules: CheckersRuleConfig): IFigureAction[] => {
  const actions: IFigureAction[] = [];
  const findCell = cells.find(cell => cell.figure?.id === figureId);
  const findFigure = findCell?.figure;
  
  if (findCell && findFigure) {
    const moveAction = calcMoveFigureAction(cells, findFigure);
    const killAction = calcKillFigureAction(cells, findCell, clearRules);
    // const killAction = undefined
    if (moveAction) {
      actions.push(moveAction);
    }
    
    if (killAction) {
      actions.push(killAction);
    }
    
    const isRequireKill = clearRules.require_kill;
    
    if (isRequireKill) {
      const someKillAction = actions.some(action => action.type === 'kill');
      
      if (!someKillAction) {
        return actions;
      }
      
      return actions.filter(action => action.type === 'kill');
    }
  }
  return actions;
};