import React, { useEffect, useReducer } from 'react';
import { usePrefectures } from '../hooks/prefectures';
import { PrefecturePopulation } from './PrefecturePopulation';
import { Spinner } from './Spinner';
import type { VFC } from 'react';
import type { PrefecturePopulationState } from './PrefecturePopulation';
import type { PopulationResponse } from '../utils/types';

import styles from '../styles/components/PrefecturesList.module.scss';

export type PrefecturesListState = {
  prefCode: number;
  prefName: string;
  population: PopulationResponse;
}[];

interface PrefecturesListProps {
  /**
   * 人口構成データのリストが変更された場合、
   * この関数に新しい `PrefecturesListState` が渡されます。
   */
  onChanged: (state: PrefecturesListState) => void;
}

/**
 * コンポーネントの状態を更新するための reducer 関数。
 * @param state 以前の状態。
 * @param action `PrefecturePopulation` コンポーネントが発行する `PrefecturePopulationState` 。
 * @returns 新しい状態。
 */
const reducer: React.Reducer<PrefecturesListState, PrefecturePopulationState> =
  (state, action) => {
    const { prefCode, prefName, population } = action;

    // 以前の状態から既存の人口構成データを削除
    const filtered = state.filter(item => item.prefCode !== prefCode);

    if (typeof population === 'undefined') {
      // チェックボックスがオフになった場合、そのまま新しい状態として返す
      return filtered;
    } else {
      // チェックボックスがオンになった場合、新しい人口構成データを追加して返す
      return [
        ...filtered,
        {
          prefCode,
          prefName,
          population
        }
      ].sort((a, b) => a.prefCode - b.prefCode);
    }
  };

/**
 * 都道府県一覧のチェックボックスを生成し、チェックボックスがオンの都道府県の
 * 人口構成データのリストを提供するコンポーネント。
 */
export const PrefecturesList: VFC<PrefecturesListProps> = ({ onChanged }) => {
  const prefs = usePrefectures();
  const [state, dispatch] = useReducer(reducer, []);

  // 状態の変化によって onChanged 関数を呼び出す
  useEffect(() => {
    onChanged(state);
  }, [onChanged, state]);

  if (prefs.state === 'loading') {
    return (
      <div className={styles.loading}>
        <div className={styles.spinnerContainer}>
          <Spinner />
        </div>
        都道府県一覧を読み込み中...
      </div>
    );
  }

  if (prefs.state === 'error') {
    return (
      <div className={styles.error}>都道府県一覧を読み込めませんでした。</div>
    );
  }

  return (
    <div className={styles.prefecturesContainer}>
      {prefs.data.result.map(pref => {
        return (
          <div className={styles.itemContainer} key={pref.prefCode}>
            <PrefecturePopulation {...pref} onChanged={dispatch} />
          </div>
        );
      })}
    </div>
  );
};
