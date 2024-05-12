import type { IFigure } from 'entities/Cell';
import type { FC } from 'react';
import { memo, useEffect } from 'react';
import module from 'widgets/Board/ui/Board.module.scss';
import { classNames } from 'shared/libs/classNames.ts';
import Crown from 'shared/assets/crown.svg?react';
import { useCheckers } from 'app/providers/CheckersProvider';

interface IProps {
  figures: Record<'common' | 'stain', number>
  color: IFigure['color']
}

export const CounterFigures: FC<IProps> = memo(({ figures, color }) => {
  const { setIsGameOver, isGameOver } = useCheckers();
  const { common, stain } = figures;
  const hasStain = stain > 0 && stain;
  const stainText = hasStain && <span className={module.Stain}>&nbsp;/ { hasStain } <Crown/></span>;

  useEffect(() => {
    if (common + stain === 0) {
      setIsGameOver(true);
    }
  }, [common, isGameOver, setIsGameOver, stain]);

  return (
    <p className={classNames(module.CounterItem, {}, [module[color]])}>
      <span className={module.Common}>{common}</span>
      {stainText}
    </p>
  );
});