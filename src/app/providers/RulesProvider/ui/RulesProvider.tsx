import { FC, PropsWithChildren, useMemo, useState } from 'react';
import { RulesContext } from '../libs/RulesContext.ts';
import { CheckersRule, checkersRules as initialCheckersRules } from 'features/checkers/models/rules.ts';

export const RulesProvider: FC<PropsWithChildren> = ({ children }) => {
  const [checkersRules, setCheckersRules] = useState<CheckersRule[]>(initialCheckersRules);
	
  const defaultCheckersRulesValue = useMemo(() => ({
    checkersRules, setCheckersRules
  }), [checkersRules]);
	
  return (
    <RulesContext.Provider value={defaultCheckersRulesValue}>
      { children }
    </RulesContext.Provider>
  );
};