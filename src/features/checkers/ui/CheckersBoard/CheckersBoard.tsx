import { FC, memo } from 'react';
import { Cell } from 'entities/Cell';
import { useFigure } from 'app/providers/FigureProvider';
import module from 'widgets/Board/ui/Board.module.scss';
import { useFigureClickHandler } from '../../libs/hooks/useFigureClickHandler.ts';
import { useCellClickHandler } from '../../libs/hooks/useCellClickHandler.ts';

export const CheckersBoard: FC = memo(() => {
  const { cells } = useFigure();
  const { isActiveFigure, onFigureClick } = useFigureClickHandler();
  const { isActiveCell, onCellClick } = useCellClickHandler();
  
  return (
    <ul className={ module.Board }>
      { cells.map(cell => (
        <Cell
          key={ cell.id }
          isActiveCell={ isActiveCell(cell.id) }
          onCellClick={ onCellClick }
          isActiveFigure={ isActiveFigure(cell.figure?.id) }
          onFigureClick={ onFigureClick }
          { ...cell }
        />)
      ) }
    </ul>
  );
});
