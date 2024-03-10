import { FC } from 'react';
import { type ICell } from '../types/types.ts';
import { classNames } from 'shared/libs/classNames.ts';
import { Figure } from 'entities/Figure';
import module from './Cell.module.scss';
import { useIsActiveCell } from '../libs/hooks/useIsActiveCell.ts';
import { useHandleActiveCell } from '../libs/hooks/useHandleActiveCell.ts';

interface IProps extends ICell {}

export const Cell: FC<IProps> = (cell) => {
	const {id, color, figure} = cell;
	const active = useIsActiveCell(id);
	const handleActiveCell = useHandleActiveCell(id)
	
	return (
		<li
			onClick={handleActiveCell}
			className={classNames(module.Cell, { active }, [module[color]])}>
			{figure && <Figure {...figure}/>}
		</li>
	);
};