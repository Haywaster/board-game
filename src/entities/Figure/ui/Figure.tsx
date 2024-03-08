import { FC } from 'react';
import { type IFigure } from '../types/types.ts';
import module from './Figure.module.scss';
import { classNames } from 'shared/libs/classNames.ts';
import { useFigure } from 'widgets/Board/providers/FigureProvider';

interface IProps extends IFigure {}

export const Figure: FC<IProps> = (figure) => {
	const { id, x, y, color, isStain } = figure;
	const { activeFigure, setActiveFigure, setCells } = useFigure();
	
	const makeActiveFigure = () => {
		if (!activeFigure || activeFigure.id !== id) {
			return figure;
		} else {
			return null;
		}
	};
	
	const onFigureClick = () => {
		const newActiveFigure = makeActiveFigure();
		
		setActiveFigure(newActiveFigure);
		
		setCells(prevCells => prevCells.map(cell => {
				if (cell.color === 'white' && cell.isEmpty) {
					if (Math.abs(y - cell.y) === 1) {
						console.log(newActiveFigure?.id === id);
						return {...cell, isActive: newActiveFigure?.id === id}
					}
				}
				return { ...cell, isActive: false };
			})
		);
	};
	
	const active = activeFigure?.id === id && 'active';
	
	return (
		<div
			onClick={ onFigureClick }
			className={ classNames(module.Figure, { active }, [module[color]]) }/>
	);
};