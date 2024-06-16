import type { IActiveFigure } from 'entities/Cell';
import type { FC, PropsWithChildren } from 'react';
import { useMemo, useState } from 'react';
import { ActiveFigureContext } from '../libs/ActiveFigureContext.ts';

export const ActiveFigureProvider: FC<PropsWithChildren> = ({ children }) => {
  const [activeFigure, setActiveFigure] = useState<IActiveFigure | null>(null);

  const defaultValue = useMemo(() => (
    { activeFigure, setActiveFigure }), [activeFigure]);

  return (
    <ActiveFigureContext.Provider value={ defaultValue }>
      { children }
    </ActiveFigureContext.Provider>
  );
};