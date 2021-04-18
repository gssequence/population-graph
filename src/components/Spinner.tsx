import React from 'react';
import type { VFC } from 'react';

import styles from '../styles/components/Spinner.module.scss';

/**
 * スピナーコンポーネント。
 */
export const Spinner: VFC = () => <div className={styles.spinner} />;
