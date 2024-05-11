import type { FC } from 'react';
import { memo, useCallback, useEffect, useState } from 'react';
import { Cell } from 'entities/Cell';
import { useCheckers } from 'app/providers/CheckersProvider';
import { useRules } from 'app/providers/RulesProvider';
import module from 'widgets/Board/ui/Board.module.scss';
import { classNames } from 'shared/libs/classNames.ts';
import { useFigureClickHandler } from '../../libs/hooks/useFigureClickHandler.ts';
import { useCellClickHandler } from '../../libs/hooks/useCellClickHandler.ts';
import { getFigureActions } from '../../libs/utils/getFigureActions.ts';

export const CheckersBoard: FC = memo(() => {
  const { clearRules } = useRules();
  const { cells, isWhiteStep } = useCheckers();
  const [requireKillFigures, setRequireKillFigures] = useState<number[]>([]);
  const { isActiveFigure, onFigureClick } = useFigureClickHandler(requireKillFigures);
  const { isActiveCell, isSkipCell, onCellClick } = useCellClickHandler();

  const setKillerFigures = useCallback((): void => {
    setRequireKillFigures([]);
    cells.forEach(cell => {
      if (cell.figure && cell.figure.color === (
        isWhiteStep ? 'white' : 'black')) {
        const figureActions = getFigureActions(cells, cell.figure.id, clearRules);

        if (figureActions.some((action) => action.type === 'kill')) {
          setRequireKillFigures(prev => [...prev, cell.figure!.id]);
        }
      }
    });
  }, [cells, clearRules, isWhiteStep]);

  useEffect(() => {
    if (!clearRules.require_kill) {
      setRequireKillFigures([]);
    } else {
      setKillerFigures();
    }
  }, [clearRules.require_kill, setKillerFigures]);

  const mods = {
    [module.withoutPrompts]: !clearRules.prompts
  };

  const isRequireFigure = (id: number | undefined): boolean => id ? requireKillFigures.includes(id) : false;

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
