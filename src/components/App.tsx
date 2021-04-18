import React, { useState } from 'react';
import Head from 'next/head';
import { PrefecturesList } from './PrefecturesList';
import { PopulationGraph } from './PopulationGraph';
import type { VFC } from 'react';
import type { PrefecturesListState } from './PrefecturesList';

import styles from '../styles/components/App.module.scss';

/**
 * アプリケーションコンポーネント。
 */
export const App: VFC = () => {
  const [state, setState] = useState<PrefecturesListState>([]);

  return (
    <div className={styles.wrapper}>
      <Head>
        <title>総人口グラフ</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <header className={styles.header}>
        <h1>総人口グラフ</h1>
      </header>
      <div className={styles.content}>
        <div className={styles.prefs}>
          都道府県
          <PrefecturesList onChanged={setState} />
        </div>
        <div className={styles.graph}>
          <PopulationGraph data={state} />
        </div>
      </div>
      <footer className={styles.footer}>
        このアプリケーションは{' '}
        <a href="https://resas.go.jp/">RESAS (地域経済分析システム)</a>{' '}
        のデータを使用しています。
      </footer>
    </div>
  );
};
