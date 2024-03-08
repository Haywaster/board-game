export interface ICell {
	id: number
	color: 'white' | 'black'
	x: number
	y: number
	isActive: boolean
	isEmpty: boolean
}