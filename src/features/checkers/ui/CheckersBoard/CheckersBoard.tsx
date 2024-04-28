import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Cell } from 'entities/Cell';
import { useFigure } from 'app/providers/FigureProvider';
import { useRules } from 'app/providers/RulesProvider';
import module from 'widgets/Board/ui/Board.module.scss';
import { classNames } from 'shared/libs/classNames.ts';
import { useFigureClickHandler } from '../../libs/hooks/useFigureClickHandler.ts';
import { useCellClickHandler } from '../../libs/hooks/useCellClickHandler.ts';
import { CheckersRuleId } from '../../models/rules.ts';
import { getFigureActions } from '../../libs/utils/getFigureActions.ts';

export const CheckersBoard: FC = memo(() => {
  const { checkersRules } = useRules();
  const { cells, isWhiteStep, setActiveFigure } = useFigure();
  const [requireKillFigures, setRequireKillFigures] = useState<number[]>([]);
  const { isActiveFigure, onFigureClick } = useFigureClickHandler(requireKillFigures);
  const { isActiveCell, onCellClick } = useCellClickHandler();
  
  const setKillerFigures = useCallback((): void => {
    setRequireKillFigures([]);
    
    cells.forEach(cell => {
      if (cell.figure && cell.figure.color === (
        isWhiteStep ? 'white' : 'black')) {
        const figureActions = getFigureActions(cells, cell.figure.id, checkersRules);
        
        if (figureActions.some((action) => action.type === 'kill')) {
          setRequireKillFigures(prev => [...prev, cell.figure!.id]);
        }
      }
    });
  }, [cells, checkersRules, isWhiteStep]);
  
  const requireKillRule = useMemo(() => checkersRules.find(rule => rule.id === CheckersRuleId.REQUIRE_KILL),
    [checkersRules]);
  
  useEffect(() => {
    if (requireKillRule && requireKillRule.checked) {
      setKillerFigures();
    }
  }, [setKillerFigures, requireKillRule, setActiveFigure]);
  
  const mods = {
    [module.withoutPrompts]: !checkersRules.find(rule => rule.id === CheckersRuleId.PROMPTS)?.checked || ''
  };
  
  const isRequireFigure = (id: number | undefined) => id ? requireKillFigures.includes(id) : false;
  
  return (
    <ul className={ classNames(module.Board, mods, []) }>
      { cells.map(cell => (
        <Cell
          key={ cell.id }
          isActiveCell={ isActiveCell(cell.id) }
          onCellClick={ onCellClick }
          isActiveFigure={ isActiveFigure(cell.figure?.id) }
          isRequireFigure={ isRequireFigure(cell.figure?.id) }
          onFigureClick={ onFigureClick }
          color={ cell.color }
          id={ cell.id }
          figure={ cell.figure }
        />)
      ) }
    </ul>
  );
});
