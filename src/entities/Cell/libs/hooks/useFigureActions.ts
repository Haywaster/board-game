import { useFigure } from 'app/providers/FigureProvider';
import type { IKillFigureAndCell } from '../../model/types.ts';

export const useFigureActions = (cellId: number) => {
	const { activeFigure, setActiveFigure, setCells, setIsWhiteStep } = useFigure();
	
	const moveFigure = () => {
		if (activeFigure) {
			setCells(prev => prev.map(cell => {
				if (cell.figure && cell.figure.id === activeFigure.figure.id) {
					cell.figure = null;
				}
				
				if (!cell.figure && cell.id === cellId) {
					cell.figure = { ...activeFigure.figure, x: cell.x, y: cell.y };
				}
				
				return cell;
			}));
			
			setIsWhiteStep(prev => !prev)
			setActiveFigure(null);
		}
	};
	
	const killFigure = (killOrder: IKillFigureAndCell[]) => {
		setCells(prev => prev.map(cell => {
			if (killOrder.find(order => order.figure.id === cell.figure?.id)) {
				return { ...cell, figure: null };
			}
			
			return cell;
		}));
	};
	
	return { moveFigure, killFigure };
};