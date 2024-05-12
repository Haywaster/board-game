import type { IFigure } from 'entities/Cell';
import type { FC, ReactElement } from 'react';
import module from 'widgets/Board/ui/Board.module.scss';
import { useCheckers } from 'app/providers/CheckersProvider';
import { CounterFigures } from './CounterFigures.tsx';
import { ModalName, useModal } from 'app/providers/ModalProvider';
import { CongratulationModal } from '../CongratulationModal/CongratulationModal.tsx';
import { memo, useEffect } from 'react';

export const CheckersCounter: FC = memo(() => {
  const { setCurrentModal } = useModal();
  const { cells, isGameOver } = useCheckers();
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

  useEffect(() => {
    if (isGameOver) {
      setCurrentModal(ModalName.CONGRATULATION);
    }
  }, [isGameOver, setCurrentModal]);

  return (
    <div
      className={module.Counter}>
      <WhiteCountFigures/> — <BlackCountFigures/>
      <CongratulationModal />
    </div>
  );
});