import { useContext } from 'react';
import { FigureContext, FigureContextProps } from './FigureContext.ts';

export const useFigure = () => {
	const { activeFigure, setActiveFigure, figures, setFigures, cells, setCells } = useContext(FigureContext) as FigureContextProps;
	
	return { activeFigure, setActiveFigure, figures, setFigures, cells, setCells };
};