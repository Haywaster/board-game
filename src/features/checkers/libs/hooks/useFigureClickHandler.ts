import type { IFigure } from 'entities/Cell';
import { useCallback } from 'react';
import { useCheckers } from 'app/providers/CheckersProvider';
import { useRules } from 'app/providers/RulesProvider';
import { getFigureActions } from '../utils/getFigureActions.ts';

interface IUseFigureClickHandler {
  onFigureClick: (figure: IFigure) => void
  isActiveFigure: (id: number | undefined) => boolean
}

export const useFigureClickHandler = (requireKillFigures: number[]): IUseFigureClickHandler => {
  const { clearRules } = useRules();
  const { cells, setActiveFigure, isWhiteStep, activeFigure } = useCheckers();

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

  const isActiveFigure = (id: number | undefined): boolean => activeFigure?.figure.id === id;

  return { onFigureClick, isActiveFigure };
};