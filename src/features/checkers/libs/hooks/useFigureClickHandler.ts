import type { IFigure } from 'entities/Cell';
import { useCallback } from 'react';
import { useFigure } from 'app/providers/FigureProvider';
import { useRules } from 'app/providers/RulesProvider';
import { getFigureActions } from '../utils/getFigureActions.ts';

export const useFigureClickHandler = (requireKillFigures: number[]) => {
  const { clearRules } = useRules();
  const { cells, setActiveFigure, isWhiteStep, activeFigure } = useFigure();

  const onFigureClick = useCallback((figure: IFigure) => {
    if (requireKillFigures.length && !requireKillFigures.includes(figure.id)) {
      return;
    }

    const whiteLaw = isWhiteStep && figure.color === 'white';
    const blackLaw = !isWhiteStep && figure.color === 'black';

    setActiveFigure(activeFigure => {
      if ((whiteLaw || blackLaw) && (!activeFigure || activeFigure.figure.id !== figure.id)) {
        const actionsActiveFigure = getFigureActions(cells, figure.id, clearRules);
        return { figure, actions: actionsActiveFigure };
      }

      if (activeFigure && activeFigure.figure.id === figure.id) {
        return null;
      }

      return activeFigure;
    });

  }, [cells, clearRules, isWhiteStep, requireKillFigures, setActiveFigure]);

  const isActiveFigure = (id: number | undefined) => activeFigure?.figure.id === id;

  return { onFigureClick, isActiveFigure };
};