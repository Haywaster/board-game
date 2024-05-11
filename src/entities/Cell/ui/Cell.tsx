import type { ICell, IFigure } from '../model/types.ts';
import { FC, memo } from 'react';
import { Figure } from '../ui/Figure/Figure.tsx';
import module from './Cell.module.scss';
import { classNames } from 'shared/libs/classNames.ts';

interface IProps extends Omit<ICell, 'x' | 'y'> {
  isActiveCell: boolean;
  isSkipCell: boolean;
  onCellClick: (id: number) => void;
  isActiveFigure: boolean;
  isRequireFigure: boolean;
  onFigureClick: (figure: IFigure) => void;
}

export const Cell: FC<IProps> = memo(({
  color,
  id,
  figure,
  isActiveCell,
  isSkipCell,
  onCellClick,
  onFigureClick,
  isActiveFigure,
  isRequireFigure
}) => {
  const mods = {
    active: isActiveCell,
    skip: isSkipCell
  };
  
  return (
    <li
      onClick={ () => onCellClick(id) }
      className={ classNames(module.Cell, mods, [module[color]]) }>
      { figure && (
        <Figure
          isRequireFigure={ isRequireFigure }
          isActiveFigure={ isActiveFigure }
          onFigureClick={ onFigureClick }
          { ...figure }
        />
      ) }
    </li>
  );
});