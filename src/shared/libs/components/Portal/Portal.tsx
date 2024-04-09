import { createPortal } from 'react-dom';
import { FC, ReactNode } from 'react';

interface IProps {
	children: ReactNode
	target?: HTMLElement
}

const Portal: FC<IProps> = ({children, target = document.body}) => {
	return createPortal(children, target)
};

export default Portal;