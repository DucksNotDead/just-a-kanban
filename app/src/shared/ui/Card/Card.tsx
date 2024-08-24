import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

import Styles from './Card.module.scss';

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export function Card(props: IProps) {
  return (
    <div {...props} className={`${Styles.Card} noselect`}>
      {props.children as ReactNode}
    </div>
  );
}
