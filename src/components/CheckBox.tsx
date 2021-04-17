import React, { ReactNode } from 'react';
import type { VFC } from 'react';

import styles from '../styles/components/CheckBox.module.scss';

export type CheckBoxState = 'off' | 'on' | 'pending' | 'error';

interface CheckBoxProps {
  children: ReactNode;
  /** コンポーネントをクリックした時に呼ばれる関数。 */
  onClick?: () => void;
  /** チェックボックスの状態。 */
  state: CheckBoxState;
}

/**
 * ステートレスなチェックボックスコンポーネント。
 */
export const CheckBox: VFC<CheckBoxProps> = ({ children, onClick, state }) => (
  <div className={styles.wrapper} onClick={onClick}>
    <div className={`${styles.box} ${styles[`box-${state}`]}`}></div>
    <div className={styles.content}>{children}</div>
  </div>
);
