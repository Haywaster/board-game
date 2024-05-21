import type { ICell, IFigureKillAction, IFigureMoveAction, IKillSchema } from 'entities/Cell';
import { useCheckers } from 'app/providers/CheckersProvider';
import { useRules } from 'app/providers/RulesProvider';
import { useCallback } from 'react';

interface IUseCellClickHandler {
  onCellClick: (cellId: number) => void
  isActiveCell: (cellId: number) => boolean
  isSkipCell: (cellId: number) => boolean
}

const animationTime = 150;

export const useCellClickHandler = (): IUseCellClickHandler => {
  const { clearRules } = useRules();
  const { activeFigure, cells, setCells, setActiveFigure, setIsWhiteStep, isFirstMoveMage, setIsFirstMoveMage } = useCheckers();

  const killAction = activeFigure?.actions.find((action): action is IFigureKillAction => action.type === 'kill');
  const moveAction = activeFigure?.actions.find((action): action is IFigureMoveAction => action.type === 'move');

  const moveFigure = useCallback((cellId: number, boardCells: ICell[] = cells, makeStain?: boolean): Promise<void> => {
    return new Promise<void>(resolve => {
      if (activeFigure) {
        setActiveFigure(null);

        const movingFigureCoords = boardCells.find(cell => cell.id === cellId);
        const cellHaveFigure = (cell: ICell): boolean => cell.figure?.id === activeFigure.figure.id;

        if (movingFigureCoords) {
          const newCells = boardCells.map(cell => {
            if (cellHaveFigure(cell)) {
              return {
                ...cell,
                figure: { ...activeFigure.figure, moveCoords: { x: movingFigureCoords.x, y: movingFigureCoords.y } }
              };
            }

            return cell;
          });
          setCells(newCells);
        }

        setTimeout(() => {
          const newCells = boardCells.map(cell => {
            if (cellHaveFigure(cell)) {
              return { ...cell, figure: null };
            }

            if (!cell.figure && cell.id === cellId) {
              const stainCondition = makeStain || !activeFigure.figure.isStain && (
                cell.y === 8 && activeFigure.figure.color === 'white') || (
                cell.y === 1 && activeFigure.figure.color === 'black');
              if (stainCondition) {
                return { ...cell, figure: { ...activeFigure.figure, x: cell.x, y: cell.y, isStain: true } };
              }
              return { ...cell, figure: { ...activeFigure.figure, x: cell.x, y: cell.y } };
            }

            return cell;
          });
          setCells(newCells);
          resolve();
        }, animationTime);
      }
    });
  }, [activeFigure, cells, setActiveFigure, setCells]);

  const killFigure = useCallback((killOrder: IKillSchema[]): ICell[] => {
    return cells.map(cell => {
      if (killOrder.find(schema => schema.figure.id === cell.figure?.id)) {
        return { ...cell, figure: null };
      }

      return cell;
    });
  }, [cells]);

  const onCellClick = useCallback(async(id: number): Promise<void> => {
    if (moveAction && moveAction.cells.some(cell => cell.id === id)) {
      if (!isFirstMoveMage) {
        setIsFirstMoveMage(true);
      }
      await moveFigure(id);
      setIsWhiteStep(prev => !prev);
      return;
    }

    if (killAction) {
      const chosenOrder = killAction.actions.find(({ killOrder }) => killOrder.some(({ cell }) => cell.id === id));

      if (chosenOrder) {
        const chosenCellIndex = chosenOrder.killOrder.findIndex(({ cell }) => cell.id === id);
        const slicedOrder = chosenOrder.killOrder.slice(0, chosenCellIndex + 1);

        if (!clearRules.kill_max_figure || clearRules.kill_max_figure && chosenCellIndex === chosenOrder.killOrder.length - 1) {
          const cellsWithoutFigures = killFigure(slicedOrder);
          for (const order of slicedOrder) {
            await moveFigure(order.cell.id, cellsWithoutFigures, chosenOrder.makeStain);
          }
          setIsWhiteStep(prev => !prev);
        }
      }
    }
  }, [clearRules.kill_max_figure, isFirstMoveMage, killAction, killFigure, moveAction, moveFigure, setIsFirstMoveMage, setIsWhiteStep]);

  const isActiveCell = useCallback((cellId: number): boolean => {
    let isKillActive = false;
    let isMoveActive = false;

    if (killAction) {
      isKillActive = killAction.actions.some(({ killOrder }) => killOrder.some(kill => kill.cell.id === cellId));
    }

    if (moveAction) {
      isMoveActive = moveAction.cells.some(cell => cell.id === cellId);
    }

    return isKillActive || isMoveActive;
  }, [killAction, moveAction]);

  const isSkipCell = useCallback((id: number): boolean => {
    if (clearRules.kill_max_figure && killAction) {
      const chosenOrder = killAction.actions.find(({ killOrder }) => killOrder.some(({ cell }) => cell.id === id));

      if (chosenOrder) {
        const chosenCellIndex = chosenOrder.killOrder.findIndex(({ cell }) => cell.id === id);

        return chosenCellIndex !== chosenOrder.killOrder.length - 1;
      }
    }

    return false;
  }, [clearRules.kill_max_figure, killAction]);

  return { onCellClick, isActiveCell, isSkipCell };
};