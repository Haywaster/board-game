import { FC } from 'react';
import { Cell } from 'entities/Cell';
import { useFigure } from 'app/providers/FigureProvider';
import module from 'widgets/Board/ui/Board.module.scss';

export const CheckersBoard: FC = () => {
	const {cells} = useFigure()
	
	return (
		<ul className={module.Board}>
			{cells.map(cell => <Cell key={cell.id} {...cell}/>)}
		</ul>
	);
};
