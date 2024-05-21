import type { CSSProperties, FC } from 'react';
import { memo } from 'react';
import module from './Figure.module.scss';
import type { IFigure } from '../../model/types.ts';
import Crown from 'shared/assets/crown.svg?react';
import { classNames } from 'shared/libs/classNames.ts';

interface IProps extends IFigure {
  isActiveFigure: boolean;
  isRequireFigure: boolean;
  onFigureClick: (figure: IFigure) => void;
}

const translateCoefficient = 125;

export const Figure: FC<IProps> = memo(({ isActiveFigure, isRequireFigure, onFigureClick, ...figure }) => {
  const { x, y, moveCoords } = figure;

  const mods = {
    [module.require]: isRequireFigure,
    [module.active]: isActiveFigure,
    [module.moving]: !!moveCoords
  };

  const animationOffset: Record<'x' | 'y', string> = {
    x: moveCoords ? (moveCoords.x - x) * translateCoefficient + '%' : 0 + '%',
    y: moveCoords ? (y - moveCoords.y) * translateCoefficient + '%' : 0 + '%'
  };

  const animationStyles: CSSProperties = {
    transform: moveCoords ? `translate(${animationOffset.x}, ${animationOffset.y})` : undefined
  };

  return (
    <div
      style={ animationStyles }
      onClick={ () => onFigureClick(figure) }
      className={ classNames(module.Figure, mods, [module[figure.color]]) }
    >
      { figure.isStain && <Crown/> }
    </div>
  );
});