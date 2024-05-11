import type { CheckersRule, CheckersRuleConfig } from 'features/checkers';
import type { Dispatch, SetStateAction } from 'react';
import { createContext } from 'react';

export interface RulesContextProps {
	checkersRules: CheckersRule[],
	setCheckersRules: Dispatch<SetStateAction<CheckersRule[]>>
  clearRules: CheckersRuleConfig
}

export const RulesContext = createContext<RulesContextProps | null>(null);
