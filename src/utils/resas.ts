import type { JSONType } from './types';

const apiBaseAddress = 'https://opendata.resas-portal.go.jp';
const apiKey = process.env.RESAS_API_KEY;

if (typeof apiKey !== 'string' || apiKey.length === 0) {
  throw new Error('環境変数 RESAS_API_KEY が設定されていません。');
}

/**
 * RESAS-API サーバーに GET リクエストを送信します。
 * 環境変数 `RESAS_API_KEY` に API キーが設定されている必要があります。
 * ステータスコードが 2xx 以外の場合、 Promise は reject されます。
 * @param path API エンドポイントのパス。 `'/api/v1/prefectures'` などを指定します。
 * @param params HTTP GET クエリパラメータ。 `{ prefCode: '1', cityCode: '-' }` などを指定します。
 * @param retry リトライ回数。既定値は `3` です。
 * @param retrySleep リトライ時の待機時間 (ミリ秒) 。既定値は `1000` です。
 * @returns JSON 値に resolve される Promise オブジェクト。
 */
export const get = async (
  path: `/api/v1/${string}`,
  params: { [key: string]: string } = {},
  retry = 3,
  retrySleep = 1000
): Promise<JSONType> => {
  try {
    const paramStrBody = new URLSearchParams(params).toString();
    const paramStr = paramStrBody.length === 0 ? '' : `?${paramStrBody}`;

    // fetch
    const res = await fetch(`${apiBaseAddress}${path}${paramStr}`, {
      method: 'GET',
      headers: { 'X-API-KEY': apiKey }
    });

    // ステータスコードの確認
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }

    const json: JSONType = await res.json();

    // API サーバーが返すエラーの処理
    if (json === '400' || json === '404') {
      throw new Error(json);
    }
    if (
      typeof json === 'object' &&
      json !== null &&
      'statusCode' in json &&
      typeof json.statusCode === 'string'
    ) {
      throw new Error(json.statusCode);
    }

    return json;
  } catch (err) {
    // リトライ
    await new Promise(resolve => setTimeout(resolve, retrySleep));
    if (retry === 0) throw err;
    return await get(path, params, retry - 1, retrySleep);
  }
};
