import { useContext } from 'react';
import { FigureContext, FigureContextProps } from './FigureContext.ts';

export const useFigure = () => {
	const
		{
			activeFigure,
			setActiveFigure,
			cells,
			setCells,
			activeCells,
			setActiveCells
		} = useContext(FigureContext) as FigureContextProps;
	
	return { activeFigure, setActiveFigure, cells, setCells, activeCells, setActiveCells };
};