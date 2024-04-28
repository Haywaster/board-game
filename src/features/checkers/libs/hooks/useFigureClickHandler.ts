import type { IFigure } from 'entities/Cell/model/types.ts';
import { IFigureAction } from 'entities/Cell/model/types.ts';
import { useFigure } from 'app/providers/FigureProvider';
import { useCallback } from 'react';
import { calcMoveFigureAction } from '../utils/calcMoveFigureAction.ts';
import { calcKillFigureAction } from '../utils/calcKillFigureAction.ts';
import { useRules } from 'app/providers/RulesProvider';
import { CheckersRuleId } from '../../models/rules.ts';

export const useFigureClickHandler = () => {
  const { checkersRules} = useRules()
  const { cells, setActiveFigure, isWhiteStep, activeFigure } = useFigure();
  
  const getFigureActions = useCallback((figureId: number): IFigureAction[] => {
    const actions: IFigureAction[] = [];
    const findCell = cells.find(cell => cell.figure?.id === figureId);
    const findFigure = findCell?.figure;
    
    if (findCell && findFigure) {
      const moveAction = calcMoveFigureAction(cells, findFigure);
      const killAction = calcKillFigureAction(cells, findFigure, findCell);
      
      if (moveAction) {
        actions.push(moveAction);
      }
      
      if (killAction) {
        actions.push(killAction);
      }
    }
    
    const isRequireKill = checkersRules.find(rule => rule.id === CheckersRuleId.REQUIRE_KILL)?.checked;
    
    if (isRequireKill) {
      const someKillAction = actions.some(action => action.type === 'kill');
      
      if (!someKillAction) {
        return actions;
      }
      
      return actions.filter(action => action.type === 'kill');
    }
    
    return actions;
  }, [cells, checkersRules]);
  
  const onFigureClick = useCallback((figure: IFigure) => {
    const whiteLaw = isWhiteStep && figure.color === 'white';
    const blackLaw = !isWhiteStep && figure.color === 'black';
    
    setActiveFigure(activeFigure => {
      if ((
        whiteLaw || blackLaw) && (
        !activeFigure || activeFigure.figure.id !== figure.id)) {
        const actionsActiveFigure = getFigureActions(figure.id);
        return { figure, actions: actionsActiveFigure };
      }
      
      if (activeFigure && activeFigure.figure.id === figure.id) {
        return null;
      }
      
      return activeFigure;
    });
    
  }, [getFigureActions, isWhiteStep, setActiveFigure]);
  
  const isActiveFigure = (id: number | undefined) => activeFigure?.figure.id === id;
  
  return { onFigureClick, isActiveFigure };
};