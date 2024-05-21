import type { FC } from 'react';
import { memo } from 'react';
import { Cell } from 'entities/Cell';
import { useCheckers } from 'app/providers/CheckersProvider';
import { useRules } from 'app/providers/RulesProvider';
import module from 'widgets/Board/ui/Board.module.scss';
import { classNames } from 'shared/libs/classNames.ts';
import { useFigureClickHandler } from '../../libs/hooks/useFigureClickHandler.ts';
import { useCellClickHandler } from '../../libs/hooks/useCellClickHandler.ts';
import { useRequireKillFigures } from '../../libs/hooks/useRequireKillFigures.ts';

export const CheckersBoard: FC = memo(() => {
  const prompts = useRules().clearRules.prompts;
  const cells = useCheckers().cells;
  const { isActiveCell, isSkipCell, onCellClick } = useCellClickHandler();
  const { requireKillFigures, isRequireFigure } = useRequireKillFigures();
  const { isActiveFigure, onFigureClick } = useFigureClickHandler(requireKillFigures);

  const mods = {
    [module.withoutPrompts]: !prompts
  };

  return (
    <ul className={ classNames(module.Board, mods, []) }>
      { cells.map(cell => (
        <Cell
          key={ cell.id }
          isActiveCell={ isActiveCell(cell.id) }
          isSkipCell={ isSkipCell(cell.id) }
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
