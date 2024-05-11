import type { FC } from 'react';
import { memo } from 'react';
import module from './Column.module.scss';

export const Column: FC = memo(() => {
  return (
    <ul className={module.Column}>
      {[...Array(8).keys()].map(i => <li key={i}>{i + 1}</li>)}
    </ul>
  );
});
