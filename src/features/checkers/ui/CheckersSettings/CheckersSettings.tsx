import type { FC, PropsWithChildren } from 'react';
import { useCallback } from 'react';
import module from './CheckersSettings.module.scss';
import Switch from 'shared/ui/Switch/Switch.tsx';
import { useRules } from 'app/providers/RulesProvider';

export const CheckersSettings: FC<PropsWithChildren> = ({ children }) => {
  const { checkersRules, setCheckersRules } = useRules();

  const onChangeHandler = useCallback(({ id, checked }: { id: string; checked: boolean }): void => {
    setCheckersRules((prev) => prev.map((item) => item.id === id ? { ...item, checked } : item));
  }, [setCheckersRules]);

  return (
    <div className={module.switchWrapper}>
      {checkersRules.map((item) => (
        <Switch
          key={item.id}
          id={item.id}
          label={item.label}
          initialChecked={item.checked}
          onChange={onChangeHandler}
        />
      ))}
      {children}
    </div>
  );
};