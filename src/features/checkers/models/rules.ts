import type { ISwitch } from 'shared/ui/Switch/Switch.tsx';

export type CheckersRule = Omit<ISwitch, 'onChange'> & { checked: boolean }

export enum CheckersRuleId {
  REQUIRE_KILL = 'require_kill',
  PROMPTS = 'prompts',
  BACK_KILL = 'back_kill'
}

export const checkersRules: CheckersRule[] = [
  {
    label: 'Require kill',
    id: CheckersRuleId.REQUIRE_KILL,
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
]