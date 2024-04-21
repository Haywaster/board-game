import { FC, memo } from 'react';
import module from './Figure.module.scss';
import type { IFigure } from '../../model/types.ts';
import Crown from 'shared/assets/crown.svg?react';
import { classNames } from 'shared/libs/classNames.ts';

interface IProps extends IFigure {
  isActiveFigure: boolean;
  onFigureClick: (figure: IFigure) => void;
}

export const Figure: FC<IProps> = memo(({ isActiveFigure, onFigureClick, ...figure }) => {
  return (
    <div
      onClick={ () => onFigureClick(figure) }
      className={ classNames(module.Figure, {active: isActiveFigure}, [module[figure.color]]) }
    >
      { figure.isStain && <Crown/> }
    </div>
  );
});