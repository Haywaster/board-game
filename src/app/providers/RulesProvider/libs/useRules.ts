import type { CheckersRuleId } from 'features/checkers/models/rules.ts';
import { useContext, useMemo } from 'react';
import { RulesContext, RulesContextProps } from './RulesContext.ts';

export type CheckersRuleConfig = Record<CheckersRuleId, boolean>

export const useRules = () => {
  const {checkersRules, setCheckersRules} = useContext(RulesContext) as RulesContextProps;
  const clearRules = useMemo(() => checkersRules.map(rule => ({ [rule.id]: rule.checked })).reduce((prev, curr) => ({ ...prev, ...curr }), {}) as CheckersRuleConfig, [checkersRules]);
  return { checkersRules, setCheckersRules, clearRules };
};