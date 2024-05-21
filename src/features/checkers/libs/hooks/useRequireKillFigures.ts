import { useCallback, useEffect, useState } from 'react';
import { getFigureActions } from '../utils/getFigureActions.ts';
import { useCheckers } from 'app/providers/CheckersProvider';
import { useRules } from 'app/providers/RulesProvider';

interface IUseRequireKillFigures {
  requireKillFigures: number[]
  isRequireFigure: (id: number | undefined) => boolean
}

export const useRequireKillFigures = (): IUseRequireKillFigures => {
  const [requireKillFigures, setRequireKillFigures] = useState<number[]>([]);
  const { cells, isWhiteStep } = useCheckers();
  const clearRules = useRules().clearRules;

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
      if (requireKillFigures.length) {
        setRequireKillFigures([]);
      }
    } else {
      setKillerFigures();
    }
  }, [clearRules.require_kill, requireKillFigures, setKillerFigures]);

  const isRequireFigure = (id: number | undefined): boolean => id ? requireKillFigures.includes(id) : false;

  return { requireKillFigures, isRequireFigure };
};