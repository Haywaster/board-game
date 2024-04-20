import type { CheckersRule } from 'features/checkers/models/rules.ts';
import { createContext, Dispatch, SetStateAction } from 'react';

export interface RulesContextProps {
	checkersRules: CheckersRule[],
	setCheckersRules: Dispatch<SetStateAction<CheckersRule[]>>
}

export const RulesContext = createContext<RulesContextProps | null>(null);
