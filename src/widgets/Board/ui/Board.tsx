import { FC } from 'react';
import module from './Board.module.scss'
import { useFigure } from '../providers/FigureProvider';
import { Cell } from 'entities/Cell';

export const Board: FC = () => {
	const {cells} = useFigure()
	
	return (
		<main>
			<div className={module.Wrapper}>
				<ul className={module.Columns}>
					{[...Array(8).keys()].map(i => <li key={i}>{i + 1}</li>)}
				</ul>
				<ul className={module.Board}>
					{cells.map(cell => <Cell key={cell.id} {...cell}/>)}
				</ul>
				<ul className={module.Rows}>
					{[...Array(8).keys()].map(i => <li key={i}>{String.fromCharCode(64 + (i + 1))}</li>)}
				</ul>
			</div>
		</main>
	);
};
