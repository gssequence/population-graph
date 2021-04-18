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
  error: E | undefined;
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

export interface PopulationResponse {
  message: null;
  result: {
    boundaryYear: number;
    data: (
      | {
          label: '総人口';
          data: {
            year: number;
            value: number;
          }[];
        }
      | {
          label: '年少人口' | '生産年齢人口' | '老年人口';
          data: {
            year: number;
            value: number;
            rate: number;
          }[];
        }
    )[];
  };
}
