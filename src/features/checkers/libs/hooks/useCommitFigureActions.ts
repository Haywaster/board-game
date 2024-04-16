import type { IKillSchema } from 'entities/Cell/model/types.ts';
import { useFigure } from 'app/providers/FigureProvider';

export const useCommitFigureActions = (cellId: number) => {
	const { activeFigure, setActiveFigure, setCells, setIsWhiteStep } = useFigure();
	
	const moveFigure = (makeStain?: boolean) => {
		if (activeFigure) {
			setCells(prev => prev.map(cell => {
				if (cell.figure && cell.figure.id === activeFigure.figure.id) {
					cell.figure = null;
				}
				
				if (!cell.figure && cell.id === cellId) {
					if (makeStain || !activeFigure.figure.isStain && (cell.y === 8 && activeFigure.figure.color === 'white') || (cell.y === 1 && activeFigure.figure.color === 'black')) {
						cell.figure = { ...activeFigure.figure, x: cell.x, y: cell.y, isStain: true };
						return cell;
					}
					cell.figure = { ...activeFigure.figure, x: cell.x, y: cell.y };
				}
				
				return cell;
			}));
			
			setIsWhiteStep(prev => !prev)
			setActiveFigure(null);
		}
	};
	
	const killFigure = (killOrder: IKillSchema[]) => {
		setCells(prev => prev.map(cell => {
			if (killOrder.find(schema => schema.figure.id === cell.figure?.id)) {
				return { ...cell, figure: null };
			}
			
			return cell;
		}));
	};
	
	return { moveFigure, killFigure };
};