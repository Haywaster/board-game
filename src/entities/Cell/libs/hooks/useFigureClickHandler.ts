import { useFigure } from 'app/providers/FigureProvider';
import { useCalcFigureActions } from './useCalcFigureActions.ts';
import type { IFigure } from '../../model/types.ts';

export const useFigureClickHandler = (figure: IFigure) => {
	const {id, color} = figure
	const { activeFigure, setActiveFigure, isWhiteStep } = useFigure();
	const { getFigureActions } = useCalcFigureActions();
	
	const onFigureClick = () => {
		
		const whiteLaw = isWhiteStep && color === 'white';
		const blackLaw = !isWhiteStep && color === 'black';
		
		if ((whiteLaw || blackLaw) &&
			(!activeFigure || activeFigure.figure.id !== id)) {
			const actionsActiveFigure = getFigureActions(id);
			setActiveFigure({ figure, actions: actionsActiveFigure });
		}
		
		if (activeFigure && activeFigure.figure.id === id) {
			setActiveFigure(null);
		}
	};
	
	const active = activeFigure?.figure.id === id;
	
	return { onFigureClick, active };
}