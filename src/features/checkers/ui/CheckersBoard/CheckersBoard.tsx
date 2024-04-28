import { FC, memo } from 'react';
import { Cell } from 'entities/Cell';
import { useFigure } from 'app/providers/FigureProvider';
import { useRules } from 'app/providers/RulesProvider';
import { useFigureClickHandler } from '../../libs/hooks/useFigureClickHandler.ts';
import { useCellClickHandler } from '../../libs/hooks/useCellClickHandler.ts';
import module from 'widgets/Board/ui/Board.module.scss';
import { classNames } from 'shared/libs/classNames.ts';
import { CheckersRuleId } from '../../models/rules.ts';

export const CheckersBoard: FC = memo(() => {
  const {checkersRules} = useRules()
  const { cells } = useFigure();
  const { isActiveFigure, onFigureClick } = useFigureClickHandler();
  const { isActiveCell, onCellClick } = useCellClickHandler();
  
  const mods = {
    [module.withoutPrompts]: !checkersRules.find(rule => rule.id === CheckersRuleId.PROMPTS)?.checked || ''
  }
  
  return (
    <ul className={ classNames(module.Board, mods, []) }>
      { cells.map(cell => (
        <Cell
          key={ cell.id }
          isActiveCell={ isActiveCell(cell.id) }
          onCellClick={ onCellClick }
          isActiveFigure={ isActiveFigure(cell.figure?.id) }
          onFigureClick={ onFigureClick }
          color={ cell.color }
          id={cell.id}
          figure={cell.figure}
        />)
      ) }
    </ul>
  );
});
