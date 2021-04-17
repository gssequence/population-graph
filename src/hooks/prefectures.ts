import { useAPI } from './api';
import type { PrefecturesResponse, SWRState } from '../utils/types';

/**
 * API ルートから都道府県一覧を取得する React Hooks 関数。
 * @returns 取得の状態を表す `SWRState` オブジェクト。
 */
export const usePrefectures = (): SWRState<PrefecturesResponse> =>
  useAPI<PrefecturesResponse>('/api/prefectures');
