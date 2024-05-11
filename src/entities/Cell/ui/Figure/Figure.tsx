import { FC, memo } from 'react';
import module from './Figure.module.scss';
import type { IFigure } from '../../model/types.ts';
import Crown from 'shared/assets/crown.svg?react';
import { classNames } from 'shared/libs/classNames.ts';

interface IProps extends IFigure {
  isActiveFigure: boolean;
  isRequireFigure: boolean
  onFigureClick: (figure: IFigure) => void;
}

export const Figure: FC<IProps> = memo(({ isActiveFigure, isRequireFigure, onFigureClick, ...figure }) => {
  const mods = {
    [module.require]: isRequireFigure,
    [module.active]: isActiveFigure
  };

  return (
    <div
      onClick={ () => onFigureClick(figure) }
      className={ classNames(module.Figure, mods, [module[figure.color]]) }
    >
      { figure.isStain && <Crown/> }
    </div>
  );
});