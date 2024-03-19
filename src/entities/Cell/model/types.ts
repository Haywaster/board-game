export interface ICell {
	id: number
	color: 'white' | 'black'
	x: number
	y: number
	figure: IFigure | null
}

export interface IFigure {
	id: number
	color: 'white' | 'black'
	x: number
	y: number
	isStain: boolean
}

export interface IKillFigureAndCell {
	figure: IFigure
	cell: ICell
}

export interface IFigureKillAction {
	type: 'kill'
	killOrder: IKillFigureAndCell[][]
}

export interface IFigureMoveAction {
	type: 'move'
	cells: ICell[]
}

export type IFigureAction = IFigureMoveAction | IFigureKillAction

export interface IActiveFigure {
	figure: IFigure
	actions: IFigureAction[]
}