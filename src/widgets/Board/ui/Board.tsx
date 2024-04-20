import { FC } from 'react';
import { CheckersBoard } from 'features/checkers';
import { Column } from './Column/Column.tsx';
import { Row } from './Row/Row.tsx';
import module from './Board.module.scss'
import { useFigure } from 'app/providers/FigureProvider';

export const Board: FC = () => {
  const {isWhiteStep} = useFigure()
	
  const color = isWhiteStep ? 'White' : 'Black'
	
  return (
    <main>
      <p className={module.TextMove}><span>{color}'s</span> move</p>
      <div className={module.Wrapper}>
        <Column/>
        <CheckersBoard/>
        <Row/>
      </div>
    </main>
  );
};
