import { FigureContext } from '../libs/FigureContext.ts';
import { FC, PropsWithChildren, useMemo, useState } from 'react';
import { type IFigure } from 'entities/Figure';
import { getCells } from 'widgets/Board';
import { ICell } from '../../../../../entities/Cell';

export const FigureProvider: FC<PropsWithChildren> = ({ children }) => {
	const {cells: initialCells, figures: initialFigures} = useMemo(() => getCells(), []);
	
	const [activeFigure, setActiveFigure] = useState<IFigure | null>(null);
	const [figures, setFigures] = useState<IFigure[]>(initialFigures);
	const [cells, setCells] = useState<ICell[]>(initialCells)
	
	const defaultActiveFigureValue = useMemo(() => (
		{
			activeFigure, setActiveFigure
		}), [activeFigure]);
	
	const defaultFiguresValue = useMemo(() => (
		{
			figures, setFigures
		}), [figures]);
	
	const defaultCellsValue = useMemo(() => (
		{
			cells, setCells
		}), [cells]);
	
	return (
		<FigureContext.Provider value={
			{
				...defaultActiveFigureValue,
				...defaultFiguresValue,
				...defaultCellsValue
			}
		}>
			{ children }
		</FigureContext.Provider>
	);
};