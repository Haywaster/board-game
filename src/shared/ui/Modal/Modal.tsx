import { FC, ReactNode, MouseEvent, useState, useRef, useEffect, useCallback } from 'react';
import module from './Modal.module.scss'
import Portal from '../../libs/components/Portal/Portal.tsx';
import { classNames } from '../../libs/classNames.ts';

interface IProps {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode
}

const animationDelay = 300

const Modal: FC<IProps> = ({children, onClose, isOpen}) => {
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>()
	
  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }, [onClose])
	
  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', onKeyDown)
    }
		
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      clearTimeout(timerRef.current)
    }
  }, [isOpen, onKeyDown])
  const onContentClick = (e: MouseEvent) => {
    e.stopPropagation()
  }
	
  const mods = {
    [module.open]: isOpen,
    [module.closing]: isClosing
  }
	
  const onCloseHandler = useCallback(() => {
    if (onClose) {
      setIsClosing(true)
      timerRef.current = setTimeout(() => {
        onClose()
        setIsClosing(false)
      }, animationDelay)
    }
  }, [onClose])
	
  return (
    <Portal>
      <div className={classNames(module.Modal, mods, [])}>
        <div onClick={onCloseHandler} className={module.Overlay}>
          <div onClick={onContentClick} className={module.Content}>
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default Modal;