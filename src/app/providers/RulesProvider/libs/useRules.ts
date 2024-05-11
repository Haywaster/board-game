import { useContext } from 'react';
import type { RulesContextProps } from './RulesContext.ts';
import { RulesContext } from './RulesContext.ts';

export const useRules = (): RulesContextProps => {
  const { checkersRules, setCheckersRules, clearRules } = useContext(RulesContext) as RulesContextProps;
  return { checkersRules, setCheckersRules, clearRules };
};