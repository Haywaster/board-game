import type { CheckersRule, CheckersRuleConfig } from 'features/checkers';
import type { FC, PropsWithChildren } from 'react';
import { useMemo, useState } from 'react';
import { RulesContext } from '../libs/RulesContext.ts';
import { checkersRules as initialCheckersRules } from 'features/checkers';

export const RulesProvider: FC<PropsWithChildren> = ({ children }) => {
  const [checkersRules, setCheckersRules] = useState<CheckersRule[]>(initialCheckersRules);

  const defaultCheckersRulesValue = useMemo(() => ({
    checkersRules, setCheckersRules
  }), [checkersRules]);

  const clearRules = useMemo(() => checkersRules.map(rule => ({ [rule.id]: rule.checked })).reduce((prev, curr) => ({ ...prev, ...curr }), {}) as CheckersRuleConfig, [checkersRules]);

  return (
    <RulesContext.Provider value={ { ...defaultCheckersRulesValue, clearRules }}>
      { children }
    </RulesContext.Provider>
  );
};