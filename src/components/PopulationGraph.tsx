import React from 'react';
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Legend,
  XAxis,
  YAxis,
  Tooltip,
  Label
} from 'recharts';
import type { VFC } from 'react';
import type { PrefecturesListState } from './PrefecturesList';

// グラフの線の色リスト
const colors = [
  'forestgreen',
  'crimson',
  'royalblue',
  'darkslateblue',
  'chocolate',
  'rebeccapurple',
  'tomato'
];

interface PopulationGraphProps {
  /** `PrefecturesList` コンポーネントが発行する `PrefectursListState` 。 */
  data: PrefecturesListState;
}

/**
 * Recharts を使用して人口構成データからグラフを描画するコンポーネント。
 */
export const PopulationGraph: VFC<PopulationGraphProps> = ({ data }) => {
  // PrefecturesListState から Rechart 用にデータを変形
  const chartData = data
    .map(pref => ({
      prefName: pref.prefName,
      data: pref.population.result.data.find(d => d.label === '総人口')
        ?.data as {
        year: number;
        value: number;
      }[]
    }))
    .reduce<{ year: number; [prefname: string]: number }[]>((acc, cur) => {
      cur.data.forEach(yearData => {
        const existingYearIndex = acc.findIndex(y => y.year === yearData.year);
        if (existingYearIndex === -1) {
          acc.push({ year: yearData.year, [cur.prefName]: yearData.value });
        } else {
          acc[existingYearIndex][cur.prefName] = yearData.value;
        }
      });
      return acc;
    }, []);

  return (
    <ResponsiveContainer width="100%" aspect={16 / 9}>
      <LineChart data={chartData}>
        <XAxis dataKey="year" height={40} tick={chartData.length !== 0}>
          <Label value="年度" offset={0} position="insideBottomRight" />
        </XAxis>
        <YAxis width={100} tick={chartData.length !== 0}>
          <Label value="人" offset={0} position="insideTopLeft" />
        </YAxis>
        <Tooltip />
        <Legend
          align="right"
          verticalAlign="top"
          layout="vertical"
          iconType="plainline"
          wrapperStyle={{ color: 'red' }}
        />
        {data.map(({ prefName }, i) => (
          <Line
            key={prefName}
            type="linear"
            dataKey={prefName}
            stroke={colors[i % colors.length]}
            dot={false}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};
