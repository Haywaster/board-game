import type { ISwitch } from 'shared/ui/Switch/Switch.tsx';

export type CheckersRule = Omit<ISwitch, 'onChange' | 'initialChecked'> & { checked: boolean }

export enum CheckersRuleId {
  REQUIRE_KILL = 'require_kill',
  PROMPTS = 'prompts',
  BACK_KILL = 'back_kill',
  KILL_MAX_FIGURES = 'kill_max_figure'
}

export type CheckersRuleConfig = Record<CheckersRuleId, boolean>

export const checkersRules: CheckersRule[] = [
  {
    label: 'Require kill',
    id: CheckersRuleId.REQUIRE_KILL,
    checked: false
  },
  {
    label: 'Kill max figures',
    id: CheckersRuleId.KILL_MAX_FIGURES,
    checked: false
  },
  {
    label: 'Prompts',
    id: CheckersRuleId.PROMPTS,
    checked: true
  },
  {
    label: 'Back kill',
    id: CheckersRuleId.BACK_KILL,
    checked: true
  }
];