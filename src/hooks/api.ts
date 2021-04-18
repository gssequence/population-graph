import useSWR from 'swr';
import type { JSONType, SWRState } from '../utils/types';

/**
 * データ取得を行うライブラリ SWR の fetcher 関数。
 * @param ...args `fetch()` 関数に渡される引数。
 * @returns JSON 値に resolve される Promise オブジェクト。
 */
export const fetcher = <T>(...args: Parameters<typeof fetch>): Promise<T> =>
  fetch(...args).then(res => res.json());

/**
 * API ルートからデータを取得する React Hooks 関数。
 * @param path API のパス。
 * @param shouldFetch データを取得するかどうかを示す boolean 値。
 * @returns 取得の状態を表す `SWRState` オブジェクト。
 */
export const useAPI = <T = JSONType, E = unknown>(
  path: string,
  shouldFetch = true
): SWRState<T, E> => {
  const { data, error } = useSWR<T, E>(shouldFetch ? path : null, fetcher);

  if (!error && !data) {
    return { state: 'loading' };
  }

  if (error || typeof data === 'undefined') {
    return { state: 'error', error };
  }

  return { state: 'done', data: data };
};
