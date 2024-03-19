import { FC, memo } from 'react';
import module from './Figure.module.scss';
import { classNames } from 'shared/libs/classNames.ts';
import type {
	IFigure,
	IFigureAction, IFigureKillAction,
	IFigureMoveAction
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
			const killOrderArr = []; // IKillFigureAndCell[][] type implied
			
			const getKillOrders = (cellActiveFigure, visitedCells = new Set(), tempOrderArr = []) => {
				if (visitedCells.has(cellActiveFigure)) {
					// Базовый случай: если рекурсия достигла ранее посещенной клетки
					if (tempOrderArr.length > 0) {
						// Если есть что добавлять, добавляем tempOrderArr в killOrderArr
						killOrderArr.push([...tempOrderArr]); // Копируем, чтобы избежать мутаций
						tempOrderArr.length = 0; // Очищаем tempOrderArr
					}
					return;
				}
				
				visitedCells.add(cellActiveFigure);
				
				// Предположим, что 'cells' и 'findFigure' доступны в вашем контексте
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
					if (tempOrderArr.length > 0) {
						killOrderArr.push([...tempOrderArr]);
						tempOrderArr.length = 0;
					}
					return;
				}
				
				enemyFigures.forEach(figure => {
					if (figure) {
						const findCell = activeCells.find(cell => Math.abs(figure.x - cell.x) === 1 && Math.abs(figure.y - cell.y) === 1);
						
						if (findCell && !visitedCells.has(findCell)) {
							const target = {figure, cell: findCell};
							tempOrderArr.push(target); // Добавляем во временный массив для текущего пути рекурсии
							getKillOrders(findCell, new Set(visitedCells), tempOrderArr);
						}
					}
				});
				
				if (tempOrderArr.length > 0 && visitedCells.size === 1) {
					// Добавляем tempOrderArr в killOrderArr, если это первый вызов функции (новая ветка рекурсии)
					killOrderArr.push([...tempOrderArr]);
					tempOrderArr.length = 0; // Очищаем tempOrderArr после добавления
				}
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