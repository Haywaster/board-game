export interface IFigure {
  id: number
  color: 'white' | 'black'
  x: number
  y: number
  isStain: boolean
}

export interface ICell {
	id: number
	color: 'white' | 'black'
	x: number
	y: number
	figure: IFigure | null
}

export interface IKillSchema {
	figure: IFigure
	cell: ICell
}

export interface IKillOrderSchema {
	killOrder: IKillSchema[]
	makeStain: boolean
}

export interface IFigureKillAction {
	type: 'kill'
	actions: IKillOrderSchema[]
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