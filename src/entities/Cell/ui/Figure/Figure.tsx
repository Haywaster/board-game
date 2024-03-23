import { FC, memo } from 'react';
import module from './Figure.module.scss';
import { classNames } from 'shared/libs/classNames.ts';
import { useFigureClickHandler } from '../../libs/hooks/useFigureClickHandler.ts';
import type { IFigure } from '../../model/types.ts';
import Crown from 'shared/assets/crown.svg?react';

interface IProps extends IFigure {}

export const Figure: FC<IProps> = memo((figure) => {
	const { active, onFigureClick } = useFigureClickHandler(figure);
	
	return (
		<div
			onClick={ onFigureClick }
			className={
				classNames(
					module.Figure,
					{ active },
					[module[figure.color]])
			}>
			{ figure.isStain && <Crown/> }
		</div>
	);
});