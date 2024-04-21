import type { IFigure } from 'entities/Cell/model/types.ts';
import { useFigure } from 'app/providers/FigureProvider';
import { useCalcFigureActions } from './useCalcFigureActions.ts';
import { useCallback } from 'react';

export const useFigureClickHandler = () => {
  const { setActiveFigure, isWhiteStep, activeFigure } = useFigure();
  const { getFigureActions } = useCalcFigureActions();
	
  const onFigureClick = useCallback((figure: IFigure) => {
    const whiteLaw = isWhiteStep && figure.color === 'white';
    const blackLaw = !isWhiteStep && figure.color === 'black';
    
    setActiveFigure(activeFigure => {
      if ((whiteLaw || blackLaw) && (!activeFigure || activeFigure.figure.id !== figure.id)) {
        const actionsActiveFigure = getFigureActions(figure.id);
        return { figure, actions: actionsActiveFigure };
      }
      
      if (activeFigure && activeFigure.figure.id === figure.id) {
        return null;
      }
      
      return activeFigure
    });
    
  }, [getFigureActions, isWhiteStep, setActiveFigure])
	
  const isActiveFigure = (id: number | undefined) => activeFigure?.figure.id === id;
	
  return { onFigureClick, isActiveFigure };
};