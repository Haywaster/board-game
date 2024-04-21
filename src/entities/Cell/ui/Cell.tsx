import { FC, memo } from 'react';
import type { ICell, IFigure } from '../model/types.ts';
import { Figure } from '../ui/Figure/Figure.tsx';
import module from './Cell.module.scss';
import { classNames } from 'shared/libs/classNames.ts';

interface IProps extends ICell {
  isActiveCell: boolean
  onCellClick: (id: number) => void
  isActiveFigure: boolean,
  onFigureClick: (figure: IFigure) => void
}

export const Cell: FC<IProps> = memo(({ color, id, figure, isActiveCell, onCellClick, onFigureClick, isActiveFigure }) => {
  return (
    <li
      onClick={() => onCellClick(id)}
      className={ classNames(module.Cell, { active: isActiveCell }, [module[color]]) }>
      { figure && (
        <Figure
          isActiveFigure={ isActiveFigure }
          onFigureClick={ onFigureClick }
          { ...figure }
        />
      ) }
    </li>
  );
});