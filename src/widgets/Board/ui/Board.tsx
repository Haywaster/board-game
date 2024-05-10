import { FC } from 'react';
import { CheckersBoard, CheckersCounter } from 'features/checkers';
import { Column } from './Column/Column.tsx';
import { Row } from './Row/Row.tsx';
import module from './Board.module.scss';
import { useFigure } from 'app/providers/FigureProvider';

export const Board: FC = () => {
  const { isWhiteStep } = useFigure();
  
  const color = isWhiteStep ? 'White' : 'Black';
  
  return (
    <main>
      <div className={ module.GameWrapper }>
        <div className={ module.GameInfo }>
          <p className={ module.TextMove }><span>{ color }'s</span> move</p>
          <CheckersCounter/>
        </div>
        <div className={ module.BoardWrapper }>
          <Column/>
          <CheckersBoard/>
          <Row/>
        </div>
      </div>
    </main>
  );
};
