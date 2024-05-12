import type { FC } from 'react';
import { CheckersBoard, CheckersCounter } from 'features/checkers';
import { Column } from './Column/Column.tsx';
import { Row } from './Row/Row.tsx';
import module from './Board.module.scss';
import { useCheckers } from 'app/providers/CheckersProvider';
import { memo } from 'react';
import type { IFigure } from 'entities/Cell';

export const Board: FC = memo(() => {
  const { isWhiteStep } = useCheckers();

  const color: Capitalize<IFigure['color']> = isWhiteStep ? 'White' : 'Black';

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
});
