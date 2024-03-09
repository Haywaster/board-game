import { IFigure } from '../../Figure';

export interface ICell {
	id: number
	color: 'white' | 'black'
	x: number
	y: number
	isActive: boolean
	figure: IFigure | null
}