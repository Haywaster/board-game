import { type IFigure } from '../../Figure';

export interface ICell {
	id: number
	color: 'white' | 'black'
	x: number
	y: number
	figure: IFigure | null
}