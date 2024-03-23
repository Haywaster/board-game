import { FC, memo } from 'react';
import module from './Figure.module.scss';
import { classNames } from 'shared/libs/classNames.ts';
import type {
	ICell,
	IFigure,
	IFigureAction, IFigureKillAction,
	IFigureMoveAction, IKillFigureAndCell
} from '../../model/types.ts';
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
	
	const getFigureActions = (figureId: number): IFigureAction[] => {
		const actions: IFigureAction[] = []
		const findCell = cells.find(cell => cell.figure?.id === figureId)
		const findFigure = findCell?.figure;
		
		if (findCell && findFigure) {
			//Move
			const emptyNearNeighboursCell = cells.filter(cell => {
				const whiteCondition = findFigure.color === 'white' && cell.y > findFigure.y;
				const blackCondition = findFigure.color === 'black' && cell.y < findFigure.y;
				return !cell.figure && (whiteCondition || blackCondition) && 	Math.abs(cell.x - findFigure.x) === 1 && Math.abs(cell.y - findFigure.y) === 1
			})
			
			if (emptyNearNeighboursCell.length) {
				const action: IFigureMoveAction = {
					type: 'move',
					cells: emptyNearNeighboursCell
				}
				actions.push(action)
			}
			
			//Kill
			const killOrderArr: IKillFigureAndCell[][] = [];

// Определение функции сокращено для повышения читаемости
			const getKillOrders = (
				cellActiveFigure: ICell,
				visitedCells: Set<ICell> = new Set(),
				tempOrderArr: IKillFigureAndCell[] = []): void => {
				
				if (visitedCells.has(cellActiveFigure)) {
					if (tempOrderArr.length > 0) killOrderArr.push([...tempOrderArr]);
					return;
				}
				
				visitedCells.add(cellActiveFigure);
				
				const enemyFigures = getEnemyFigures(cellActiveFigure, visitedCells);
				const activeCells = getActiveCells(cellActiveFigure, visitedCells);
				
				if (enemyFigures.length === 0 || activeCells.length === 0) {
					if (tempOrderArr.length > 0) killOrderArr.push([...tempOrderArr]);
					return;
				}
				
				enemyFigures.forEach(figure => {
					const findCell = activeCells.find(cell => checkCellDistance(figure, cell));
					
					if (figure && findCell && !visitedCells.has(findCell)) {
						const target: IKillFigureAndCell = {figure, cell: findCell};
						tempOrderArr.push(target);
						getKillOrders(findCell, new Set(visitedCells), tempOrderArr);
					}
				});
				
				if (tempOrderArr.length > 0 && visitedCells.size === 1) killOrderArr.push([...tempOrderArr]);
			};
			
			const getEnemyFigures = (cellActiveFigure: ICell, visitedCells: Set<ICell>): IFigure[] => {
				return cells
				.filter(cell => checkEnemyFigure(cell, cellActiveFigure) && !visitedCells.has(cell))
				.map(cell => cell.figure!);
			};
			
			const getActiveCells = (cellActiveFigure: ICell, visitedCells: Set<ICell>): ICell[] => {
				return cells.filter(cell => checkActiveCell(cell, cellActiveFigure) && !visitedCells.has(cell));
			};
			
			const checkEnemyFigure = (cell: ICell, cellActiveFigure: ICell): boolean => {
				return cell.figure! && cell.figure.color !== findFigure.color &&
					Math.abs(cell.x - cellActiveFigure.x) === 1 && Math.abs(cell.y - cellActiveFigure.y) === 1;
			};
			
			const checkActiveCell = (cell: ICell, cellActiveFigure: ICell): boolean => {
				return !cell.figure &&
					Math.abs(cell.x - cellActiveFigure.x) === 2 &&
					Math.abs(cell.y - cellActiveFigure.y) === 2;
			};
			
			const checkCellDistance = (figure: IFigure, cell: ICell): boolean => {
				return Math.abs(figure.x - cell.x) === 1 && Math.abs(figure.y - cell.y) === 1;
			};
			
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