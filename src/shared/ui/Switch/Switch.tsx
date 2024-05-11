import { FC, memo, useState } from 'react';
import module from './Switch.module.scss';
import { classNames } from '../../libs/classNames.ts';

export interface ISwitch {
	onChange: ({ id, checked }: { id: string; checked: boolean }) => void
	initialChecked?: boolean
	label?: string
	id: string
}

interface IProps extends ISwitch{}

const Switch: FC<IProps> = memo(({
  id,
  initialChecked = false,
  onChange,
  label
}) => {
  const [checked, setChecked] = useState(initialChecked);

  const toggleSwitch = () => {
    setChecked((prev) => !prev);

    if (onChange) {
      onChange({ id, checked: !checked });
    }
  };

  return (
    <label className={classNames(module.Switch, { checked }, [])}>
      <input
        type="checkbox"
        checked={checked}
        onChange={toggleSwitch}
        className={module.Input}
      />
      <div className={module.Track}>
        <div className={module.Toggle} />
      </div>
      {label}
    </label>
  );
});

export default Switch;
