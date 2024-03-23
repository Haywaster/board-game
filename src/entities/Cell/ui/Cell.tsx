import { FC, memo } from 'react';
import type { ICell } from '../model/types.ts';
import { classNames } from 'shared/libs/classNames.ts';
import { Figure } from '../ui/Figure/Figure.tsx';
import { useIsActiveCell } from '../libs/hooks/useIsActiveCell.ts';
import { useCellClickHandler } from '../libs/hooks/useCellClickHandler.ts';
import module from './Cell.module.scss';

interface IProps extends ICell {}

export const Cell: FC<IProps> = memo((cell) => {
	const {id, color, figure} = cell;
	const active = useIsActiveCell(id);
	const handleActiveCell = useCellClickHandler(id)
	
	return (
		<li
			onClick={handleActiveCell}
			className={classNames(module.Cell, { active }, [module[color]])}>
			{figure && <Figure {...figure}/>}
		</li>
	);
});