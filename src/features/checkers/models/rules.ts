import { ISwitch } from 'shared/ui/Switch/Switch.tsx';

export type CheckersRule = Omit<ISwitch, 'onChange'> & { checked: boolean }

export const checkersRules: CheckersRule[] = [
  {
    label: 'Require kill',
    id: 'require_kill',
    checked: false
  },
  {
    label: 'Prompts',
    id: 'prompts',
    checked: true
  },
]