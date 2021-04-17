import { useAPI } from './api';
import type { PopulationResponse, SWRState } from '../utils/types';

/**
 * API ルートから人口構成を取得する React Hooks 関数。
 * @param prefCode 都道府県コード。
 * @param shouldFetch データを取得するかどうかを示す boolean 値。
 * @returns 取得の状態を表す `SWRState` オブジェクト。
 */
export const usePopulation = (
  prefCode: number,
  shouldFetch: boolean
): SWRState<PopulationResponse> =>
  useAPI<PopulationResponse>(`/api/population/${prefCode}`, shouldFetch);
