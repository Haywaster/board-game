import { ButtonHTMLAttributes, FC, memo } from 'react';
import { classNames } from 'shared/libs/classNames.ts';
import module from './Button.module.scss'

// eslint-disable-next-line
export enum ThemeButton {
	CLEAR = 'clear'
}

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement>{
	className?: string
	theme?: ThemeButton
}

const Button: FC<IProps> = memo(({className, children, theme, ...btnProps}) => {
  return (
    <button
      className={classNames(module.Button, {}, [className, module[theme || '']])}
      {...btnProps}
    >
      {children}
    </button>
  );
});

export default Button;