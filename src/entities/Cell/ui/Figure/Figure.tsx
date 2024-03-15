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
		const findFigure = cells.find(cell => cell.figure?.id === figureId)?.figure;
		
		//Move
		const nearNeighboursCell = getNeighboursCell(figureId)
		
		const emptyNearNeighboursCell = nearNeighboursCell.filter(cell => {
			if (findFigure) {
				const whiteCondition = findFigure.color === 'white' && cell.y > findFigure.y;
				const blackCondition = findFigure.color === 'black' && cell.y < findFigure.y;
				return !cell.figure && (
					whiteCondition || blackCondition)
			}
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
		const fearNeighboursCell = getNeighboursCell(figureId, 'figure', 2)
		
		const potentialKillActions = fearNeighboursCell.filter(c => {
			if (findFigure) {
				const enemyFigureCell = cells.find(cell => {
					const isEnemyFigure = cell.figure
						&& findFigure.color !== cell.figure.color
						&& Math.abs(cell.x - findFigure.x) === 1
						&& Math.abs(cell.y - findFigure.y) === 1;
					
					const isBetween = (findFigure.x + c.x) / 2 === cell.x && (findFigure.y + c.y) / 2 === cell.y;
					
					return isEnemyFigure && isBetween;
				});
				
				return c.figure === null && enemyFigureCell !== undefined;
			} else {
				return false;
			}
		});
		
		potentialKillActions.forEach(pka => {
			const enemyCell = cells.find(cell => {
				const isBetween = findFigure && (findFigure.x + pka.x) / 2 === cell.x && (findFigure.y + pka.y) / 2 === cell.y;
				return isBetween;
			});
			if (enemyCell && enemyCell.figure) {
				const killAction: IKillFigureAndCell = {
					figure: enemyCell.figure,
					cell: pka
				};
				
				killOrderArr.push(killAction);
			}
		});
		
		if (killOrderArr.length) {
			const action: IFigureKillAction = {
				type: 'kill',
				killOrder: killOrderArr
			}
			actions.push(action)
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