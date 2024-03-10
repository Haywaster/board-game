import { FigureContext } from '../libs/FigureContext.ts';
import { FC, PropsWithChildren, useMemo, useState } from 'react';
import { type ICell } from 'entities/Cell';
import { getCells } from 'widgets/Board';
import { IActiveFigure } from 'entities/Figure';

export const FigureProvider: FC<PropsWithChildren> = ({ children }) => {
	const initialCells = useMemo(() => getCells(), []);
	
	const [cells, setCells] = useState<ICell[]>(initialCells)
	const [activeFigure, setActiveFigure] = useState<IActiveFigure | null>(null);
	
	const defaultActiveFigureValue = useMemo(() => (
		{
			activeFigure, setActiveFigure
		}), [activeFigure]);
	
	const defaultCellsValue = useMemo(() => (
		{
			cells, setCells
		}), [cells]);
	
	return (
		<FigureContext.Provider value={
			{
				...defaultActiveFigureValue,
				...defaultCellsValue,
			}
		}>
			{ children }
		</FigureContext.Provider>
	);
};