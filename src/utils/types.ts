export type JSONType =
  | string
  | number
  | boolean
  | null
  | JSONType[]
  | { [key: string]: JSONType };

interface SWRLoading {
  state: 'loading';
}
interface SWRDone<T = JSONType> {
  state: 'done';
  data: T;
}
interface SWRError<E = unknown> {
  state: 'error';
  error: E;
}
export type SWRState<T = JSONType, E = unknown> =
  | SWRLoading
  | SWRDone<T>
  | SWRError<E>;

export interface PrefecturesResponse {
  message: null;
  result: {
    prefCode: number;
    prefName: string;
  }[];
}
