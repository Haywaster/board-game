import { FC, useEffect } from 'react';
import { type ICell } from '../types/types.ts';
import { classNames } from 'shared/libs/classNames.ts';
import { type IFigure, Figure } from 'entities/Figure';
import module from './Cell.module.scss';
import { useFigure } from 'widgets/Board/providers/FigureProvider';

interface IProps extends ICell{
	figure?: IFigure
}

export const Cell: FC<IProps> = (cell) => {
	const {id, x, y, color, isActive, isEmpty, figure} = cell
	const {activeFigure, setActiveFigure, cells, setCells} = useFigure()
	
	return (
		<li
			// onClick={handlerActiveCell}
			className={classNames(module.Cell, {active: isActive}, [module[color]])}>
			{figure && <Figure {...figure}/>}
		</li>
	);
};