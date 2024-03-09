import { FC } from 'react';
import { type ICell } from '../types/types.ts';
import { classNames } from 'shared/libs/classNames.ts';
import { Figure } from 'entities/Figure';
import { useFigure } from 'widgets/Board/providers/FigureProvider';
import module from './Cell.module.scss';

interface IProps extends ICell{}

export const Cell: FC<IProps> = (cell) => {
	const {id, x, y, color, isActive, figure} = cell
	const {activeFigure, setActiveFigure, setCells} = useFigure()
	
	const handlerActiveCell = () => {
		if (isActive && activeFigure) {
			setCells(prev => prev.map(cell => {
				if (cell.figure && cell.figure.id === activeFigure.id) {
					cell.figure = null
				}
				
				if (!cell.figure && cell.id === id) {
					cell.figure = { ...activeFigure, x, y }
				}
				
				return {...cell, isActive: false}
			}))
			
			setActiveFigure(null)
		}
	}
	
	return (
		<li
			onClick={handlerActiveCell}
			className={classNames(module.Cell, {active: isActive}, [module[color]])}>
			{figure && <Figure {...figure}/>}
		</li>
	);
};