import { FC, memo } from 'react';
import module from './Figure.module.scss';
import { classNames } from 'shared/libs/classNames.ts';
import type {
	IFigure,
	IFigureAction, IFigureKillAction,
	IFigureMoveAction, IKillFigureAndCell
} from '../../model/types.ts';
import type { ICell } from 'entities/Cell/index.ts';
import { useFigure } from 'app/providers/FigureProvider';

interface IProps extends IFigure {}

export const Figure: FC<IProps> = memo((figure) => {
	const {activeFigure, setActiveFigure, cells, isWhiteStep} = useFigure()
	const { id, color } = figure;
	
	const onFigureClick = () => {
		const whiteLaw = isWhiteStep && color === 'white'
		const blackLaw = !isWhiteStep && color === 'black'
		
		if ((whiteLaw || blackLaw) && (!activeFigure || activeFigure.figure.id !== id)) {
			const actionsActiveFigure = getFigureActions(id)
			setActiveFigure({ figure, actions: actionsActiveFigure});
		}
		
		if (activeFigure && activeFigure.figure.id === id) {
			setActiveFigure(null)
		}
	};
	
	const getNeighboursCell = (id: number, whoseId: 'figure' | 'cell' = 'figure', neighArea: number = 1): ICell[]  => {
		const findCell = cells.find(cell => whoseId === 'figure' ? cell.figure?.id === id : cell.id === id)
		
		if (!findCell) {
			return [];
		}
		
		return cells.filter(cell => {
			const baseRules = cell.color === 'black'
			const xStep = Math.abs(findCell.x - cell.x) <= neighArea
			const yStep = Math.abs(findCell.y - cell.y) <= neighArea
			
			if (baseRules && yStep && xStep && cell.id !== findCell.id) {
				return cell
			}
		})
	}
	
	const getFigureActions = (figureId: number): IFigureAction[] => {
		const actions: IFigureAction[] = []
		const findCell = cells.find(cell => cell.figure?.id === figureId)
		const findFigure = findCell?.figure;
		
		if (findCell && findFigure) {
			//Move
			const nearNeighboursCell = getNeighboursCell(figureId)
			
			const emptyNearNeighboursCell = nearNeighboursCell.filter(cell => {
				const whiteCondition = findFigure.color === 'white' && cell.y > findFigure.y;
				const blackCondition = findFigure.color === 'black' && cell.y < findFigure.y;
				return !cell.figure && (whiteCondition || blackCondition)
			})
			
			if (emptyNearNeighboursCell.length) {
				const action: IFigureMoveAction = {
					type: 'move',
					cells: emptyNearNeighboursCell
				}
				actions.push(action)
			}
			
			//Kill
			const killOrderArr: IKillFigureAndCell[] = []
			
			const getKillOrders = (cellActiveFigure: ICell, visitedCells: Set<ICell> = new Set()): void => {
				if (visitedCells.has(cellActiveFigure)) {
					return;
				}
				
				visitedCells.add(cellActiveFigure);
				
				const enemyFigures =
					cells
					.filter(cell => cell.figure && cell.figure.color !== findFigure.color &&
						Math.abs(cell.x - cellActiveFigure.x) === 1 && Math.abs(cell.y - cellActiveFigure.y) === 1 &&
						!visitedCells.has(cell))
					.map(cell => cell.figure);
				
				const activeCells = cells.filter(cell => {
					return !cell.figure &&
						Math.abs(cell.x - cellActiveFigure.x) === 2 &&
						Math.abs(cell.y - cellActiveFigure.y) === 2 &&
						!visitedCells.has(cell);
				});
				
				if (enemyFigures.length === 0 || activeCells.length === 0) {
					return;
				}
				
				enemyFigures.forEach(figure => {
					if (figure) {
						const findCell = activeCells.find(cell => Math.abs(figure.x - cell.x) === 1 && Math.abs(figure.y - cell.y) === 1)
						
						if (findCell && !visitedCells.has(findCell)) {
							const target: IKillFigureAndCell = {figure, cell: findCell};
							killOrderArr.push(target);
							getKillOrders(findCell, visitedCells);
						}
					}
				});
			}
			
			getKillOrders(findCell, new Set());
			
			if (killOrderArr.length) {
				const action: IFigureKillAction = {
					type: 'kill',
					killOrder: killOrderArr
				}
				actions.push(action)
			}
		}
		
		return actions
	}
	
	const active = activeFigure?.figure.id === id
	
	return (
		<div
			onClick={ onFigureClick }
			className={ classNames(module.Figure, { active }, [module[color]]) }/>
	);
});