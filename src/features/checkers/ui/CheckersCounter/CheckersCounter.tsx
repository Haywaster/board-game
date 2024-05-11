import type { IFigure } from 'entities/Cell';
import type { FC, ReactElement } from 'react';
import module from 'widgets/Board/ui/Board.module.scss';
import { useCheckers } from 'app/providers/CheckersProvider';
import { CounterFigures } from './CounterFigures.tsx';
import Congratulation from '../Congratulation/Congratulation.tsx';

export const CheckersCounter: FC = () => {
  const { cells, isGameOver, setIsGameOver } = useCheckers();
  const whiteFigures = cells.map((cell) => cell.figure).filter((figure): figure is IFigure => figure?.color === 'white');
  const blackFigures = cells.map(cell => cell.figure).filter((figure): figure is IFigure => figure?.color === 'black');

  const figures: Record<IFigure['color'], Record<'common' | 'stain', number>> = {
    white: {
      common: whiteFigures.filter(figure => !figure?.isStain).length,
      stain: whiteFigures.filter(figure => figure?.isStain).length
    },
    black: {
      common: blackFigures.filter(figure => !figure?.isStain).length,
      stain: blackFigures.filter(figure => figure?.isStain).length
    }
  };

  const WhiteCountFigures = (): ReactElement => <CounterFigures figures={figures.white} color="white"/>;
  const BlackCountFigures = (): ReactElement => <CounterFigures figures={figures.black} color="black"/>;

  return (
    <div
      className={module.Counter}>
      <WhiteCountFigures/> — <BlackCountFigures/>
      <Congratulation openModal={isGameOver} closeHandler={() => setIsGameOver(false)}/>
    </div>
  );
};