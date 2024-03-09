import { FigureContext } from '../libs/FigureContext.ts';
import { FC, PropsWithChildren, useMemo, useState } from 'react';
import { type IFigure } from 'entities/Figure';
import { type ICell } from 'entities/Cell';
import { getCells } from 'widgets/Board';

export const FigureProvider: FC<PropsWithChildren> = ({ children }) => {
	const initialCells = useMemo(() => getCells(), []);
	
	const [cells, setCells] = useState<ICell[]>(initialCells)
	const [activeFigure, setActiveFigure] = useState<IFigure | null>(null);
	const [activeCells, setActiveCells] = useState<ICell[]>([])
	
	const defaultActiveFigureValue = useMemo(() => (
		{
			activeFigure, setActiveFigure
		}), [activeFigure]);
	
	const defaultCellsValue = useMemo(() => (
		{
			cells, setCells
		}), [cells]);
	
	const defaultActiveCellsValue = useMemo(() => (
		{
			activeCells, setActiveCells
		}), [activeCells]);
	
	return (
		<FigureContext.Provider value={
			{
				...defaultActiveFigureValue,
				...defaultCellsValue,
				...defaultActiveCellsValue
			}
		}>
			{ children }
		</FigureContext.Provider>
	);
};