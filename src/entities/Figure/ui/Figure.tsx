import { FC } from 'react';
import { type IFigure } from '../../Figure';
import { type ICell } from '../../Cell';
import module from './Figure.module.scss';
import { classNames } from 'shared/libs/classNames.ts';
import { useFigure } from 'widgets/Board/providers/FigureProvider';

interface IProps extends IFigure {}

export const Figure: FC<IProps> = (figure) => {
	const { id, color } = figure;
	const { activeFigure, setActiveFigure, cells, setActiveCells } = useFigure();
	
	const makeActiveFigure = () => {
		if (!activeFigure || activeFigure.id !== id) {
			return figure;
		} else {
			return null;
		}
	};
	
	const onFigureClick = () => {
		const newActiveFigure = makeActiveFigure();
		const neighboursActiveFigure = getNeighboursCell(id)
		const directions = getDirectionMove(neighboursActiveFigure, id)
		console.log(directions);
		// const newCells = cells.map(cell => {
		// 	const findEmptyItem = neighboursActiveFigure?.find(item => item.id === cell.id && !item.figure)
		// 	const findFigureItem = neighboursActiveFigure?.find(item => item.id === cell.id && item.figure)
		//
		// 	if (findEmptyItem) {
		// 		return {...cell, isActive: id === newActiveFigure?.id}
		// 	}
		//
		// 	if (findFigureItem && cell.figure) {
		// 		const neighboursFigure = getNeighboursCell(cell.figure.id)
		// 		const findEmptyItems = neighboursFigure?.filter(item => !item.figure)
		// 		// return neighboursFigure?.find(item => !item.figure)
		// 	}
		//
		// 	return { ...cell, isActive: false }
		// })
		id === newActiveFigure?.id ? setActiveCells(directions) : setActiveCells([])
		setActiveFigure(newActiveFigure)
	};
	
	const getNeighboursCell = (id: number, whoseId: 'figure' | 'cell' = 'figure'): ICell[]  => {
		const findCell = cells.find(cell => whoseId === 'figure' ? cell.figure?.id === id : cell.id === id)
		
		if (!findCell) {
			return [];
		}
		
		return cells.filter(cell => {
			const baseRules = cell.color === 'black'
			const xStep = Math.abs(findCell.x - cell.x) === 1
			const yStep = Math.abs(findCell.y - cell.y) === 1
			
			if (baseRules && yStep && xStep) {
				return cell
			}
		})
	}
	
	const getDirectionMove = (arr: ICell[], figureId: number): ICell[] => {
		const items: ICell[] = []
		const findFigure = cells.find(cell => cell.figure?.id === figureId)?.figure;
		
		if (!findFigure) {
			return [];
		}
		
		arr.forEach(cell => {
			const whiteCondition = findFigure.color === 'white' && cell.y > findFigure.y;
			const blackCondition = findFigure.color === 'black' && cell.y < findFigure.y;
			
			if (whiteCondition || blackCondition) {
				if (!cell.figure) {
					items.push(cell);
				} else {
					if (findFigure.color !== cell.figure.color) {
						const newCellNeighbours = getNeighboursCell(cell.id, 'cell');
						const emptyItem = newCellNeighbours.find(nextCell => !nextCell.figure && Math.abs(nextCell.x - findFigure.x) === 2 && Math.abs(nextCell.y - findFigure.y) === 2);
						if (emptyItem) {
							items.push(emptyItem);
						}
					}
				}
			}
		});
		
		return items;
	}
	
	const active = activeFigure?.id === id;
	
	return (
		<div
			onClick={ onFigureClick }
			className={ classNames(module.Figure, { active }, [module[color]]) }/>
	);
};