import { FC } from 'react';
import module from './Row.module.scss';

export const Row: FC = () => {
  return (
    <ul className={module.Row}>
      {[...Array(8).keys()].map(i => <li key={i}>{String.fromCharCode(64 + (i + 1))}</li>)}
    </ul>
  );
};
