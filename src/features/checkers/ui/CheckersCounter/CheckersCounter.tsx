import type { IFigure } from 'entities/Cell';
import type { FC, ReactNode } from 'react';
import module from 'widgets/Board/ui/Board.module.scss';
import { useFigure } from 'app/providers/FigureProvider';
import { classNames } from 'shared/libs/classNames.ts';
import Crown from 'shared/assets/crown.svg?react';

export const CheckersCounter: FC = () => {
  const { cells } = useFigure();
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

  const showCountFigures = (figures: Record<'common' | 'stain', number>, color: IFigure['color']): ReactNode => {
    const { common, stain } = figures;
    const hasStain = stain > 0 && stain;
    const stainText = hasStain && <span className={module.Stain}>&nbsp;/ { hasStain } <Crown/></span>;

    return (
      <p className={classNames(module.CounterItem, {}, [module[color]])}>
        <span className={module.Common}>{common}</span>
        {stainText}
      </p>
    );
  };

  const whiteCountFigures = showCountFigures(figures.white, 'white');
  const blackCountFigures = showCountFigures(figures.black, 'black');

  return (
    <div
      className={module.Counter}>
      { whiteCountFigures } — { blackCountFigures }
    </div>
  );
};