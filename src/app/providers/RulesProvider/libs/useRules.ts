import { useContext } from 'react';
import { RulesContext, RulesContextProps } from './RulesContext.ts';

export const useRules = () => {
  const {checkersRules, setCheckersRules} = useContext(RulesContext) as RulesContextProps;
  return { checkersRules, setCheckersRules };
};