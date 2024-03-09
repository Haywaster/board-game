import { FC } from 'react';
import { type IFigure } from '../../Figure';
import module from './Figure.module.scss';
import { classNames } from 'shared/libs/classNames.ts';
import { useFigure } from 'widgets/Board/providers/FigureProvider';
import { ICell } from '../../Cell';

interface IProps extends IFigure {}

export const Figure: FC<IProps> = (figure) => {
	const { id, color } = figure;
	const { activeFigure, setActiveFigure, cells, setCells } = useFigure();
	
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
		
		const newCells = cells.map(cell => {
			const findEmptyItem = neighboursActiveFigure?.find(item => item.id === cell.id && !item.figure)
			const findFigureItem = neighboursActiveFigure?.find(item => item.id === cell.id && item.figure)
			
			if (findEmptyItem) {
				return {...cell, isActive: id === newActiveFigure?.id}
			}
			
			if (findFigureItem && cell.figure) {
				const neighboursFigure = getNeighboursCell(cell.figure.id)
				const findEmptyItems = neighboursFigure?.filter(item => !item.figure)
				// return neighboursFigure?.find(item => !item.figure)
			}
			
			return { ...cell, isActive: false }
		})
		
		setActiveFigure(newActiveFigure);
		setCells(newCells)
		// setCells(prevCells =>
		// 	prevCells.map(cell => {
		// 		const baseRules = cell.color === 'black'
		// 		const yStep = y - cell.y === -1 && color === 'white' || y - cell.y === 1 && color === 'black'
		// 		const xStep = Math.abs(x - cell.x) === 1
		// 		const activeCell = { ...cell, isActive: newActiveFigure?.id === id }
		//
		// 		if (baseRules && xStep && yStep) {
		// 			if (!cell.figure) {
		// 				return activeCell
		// 			} else if (cell.figure?.color !== color) {
		// 				cells.find(prevCell => {
		// 					if (!prevCell.figure && prevCell.color === 'black' && Math.abs(cell.x - prevCell.x) === 1 && cell.y - prevCell.y === -1 && cell.figure?.color === 'black' || cell.y - prevCell.y === 1 && cell.figure?.color === 'white') {
		// 						return prevCell
		// 					}
		// 					// const baseRules = prevCell.color === 'black'
		// 					// const yStep = y - prevCell.y === -1 && color === 'white' || y - prevCell.y === 1 && color === 'black'
		// 					// const xStep = Math.abs(x - prevCell.x) === 1
		// 					// const activeCell = { ...prevCell, isActive: newActiveFigure?.id === id }
		// 					//
		// 					// if (baseRules && xStep && yStep && !prevCell.figure) {
		// 					// 	return activeCell
		// 					// }
		// 				})
		// 			}
		// 		}
		// 		return { ...cell, isActive: false };
		// 	})
		// );
	};
	
	const getNeighboursCell = (id: number, whoseId: 'figure' | 'cell' = 'figure'): ICell[] | undefined => {
		const findCell = cells.find(cell => whoseId === 'figure' ? cell.figure?.id === id : cell.id === id)
		
		if (findCell) {
			return cells.filter(cell => {
				const baseRules = cell.color === 'black'
				const xStep = Math.abs(findCell.x - cell.x) === 1
				const yStep = Math.abs(findCell.y - cell.y) === 1
				
				if (baseRules && yStep && xStep) {
					return cell
				}
			})
		}
	}
	
	const active = activeFigure?.id === id;
	
	return (
		<div
			onClick={ onFigureClick }
			className={ classNames(module.Figure, { active }, [module[color]]) }/>
	);
};