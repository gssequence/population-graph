import React, { useEffect, useState } from 'react';
import { CheckBox } from './CheckBox';
import { usePopulation } from '../hooks/population';
import type { VFC } from 'react';
import type { CheckBoxState } from './CheckBox';
import type { PopulationResponse } from '../utils/types';

export interface PrefecturePopulationState {
  prefCode: number;
  prefName: string;
  population: PopulationResponse | undefined;
}

interface PrefecturePopulationProps {
  /** 都道府県コード。 */
  prefCode: number;
  /** 都道府県名。 */
  prefName: string;
  /**
   * 人口構成データが正しく取得されチェックボックスがオンになった場合、
   * この関数に新しい `PrefecturePopulationState` が渡されます。
   * また、チェックボックスがオフになった場合、 `PrefecturePopulationState` 中の
   * 人口構成データ `population` は undefined が設定されます。
   */
  onChanged: (state: PrefecturePopulationState) => void;
}

/**
 * 都道府県 1 つの人口構成データを、チェックボックスの状態に応じて
 * 提供するコンポーネント。
 */
export const PrefecturePopulation: VFC<PrefecturePopulationProps> = ({
  prefCode,
  prefName,
  onChanged
}) => {
  const [shouldFetch, setShouldFetch] = useState(false);
  const [cache, setCache] = useState<PopulationResponse | undefined>(void 0);
  const [checkBoxState, setCheckBoxState] = useState<CheckBoxState>('off');
  const population = usePopulation(prefCode, shouldFetch);

  // データ取得が初めて完了した場合、キャッシュをセットしチェックボックスを
  // オンにする
  useEffect(() => {
    if (checkBoxState === 'pending') {
      if (population.state === 'done') {
        // データ取得が正常に行われた場合
        setCache(population.data);
        setCheckBoxState('on');
      } else if (population.state === 'error') {
        // データ取得にエラーがあった場合
        setCheckBoxState('error');
      }
    }
  }, [population, checkBoxState]);

  // チェックボックスの状態によって onChanged 関数を呼び出す
  useEffect(() => {
    onChanged({
      prefCode,
      prefName,
      population: checkBoxState === 'on' ? cache : void 0
    });
  }, [prefCode, prefName, onChanged, checkBoxState, cache]);

  // チェックボックスをクリックした時のハンドラ関数
  const onClick = () => {
    if (checkBoxState === 'off' || checkBoxState === 'error') {
      if (typeof cache === 'undefined') {
        // キャッシュが無い場合、データ取得開始
        setCheckBoxState('pending');
        setShouldFetch(true);
      } else {
        // キャッシュがある場合、チェックボックスをオン
        setCheckBoxState('on');
      }
    } else if (checkBoxState === 'on') {
      // チェックボックスをオフにする
      setCheckBoxState('off');
    }
  };

  return (
    <CheckBox state={checkBoxState} onClick={onClick}>
      {prefName}
    </CheckBox>
  );
};
