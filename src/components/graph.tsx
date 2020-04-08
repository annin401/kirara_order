import React from 'react';
import '../styles/tailwind.css';

import moment, { Moment } from 'moment';
import { VictoryChart, VictoryAxis, VictoryContainer } from 'victory';

// issue の意味は「月号(3月号とかの月号)」
function makeHorizontalTickData(oldestIssue: Moment, latestIssue: Moment) {
  let tickArray: Date[] = [];
  const addDate = (year: number, month: number) => {
    tickArray.push(new Date(year, month));
  };

  const oldestYear = oldestIssue.year();
  const newestYear = latestIssue.year();
  const monthOfOldestYear = oldestIssue.month();
  const monthOfNewestYear = latestIssue.month();

  // 横軸で表示する目盛りとして用いるデータを生成
  for (let year = oldestYear; year <= newestYear; ++year) {
    if (year === oldestYear) {
      for (let month = monthOfOldestYear; month <= 11; ++month) {
        addDate(year, month);
      }
    } else if (year === newestYear) {
      for (let month = 0; month <= monthOfNewestYear; ++month) {
        addDate(year, month);
      }
    } else {
      for (let month = 0; month <= 11; ++month) {
        addDate(year, month);
      }
    }
  }

  return tickArray;
}

type GraphProps = {};

const Graph = (props: GraphProps) => {
  const {} = props;

  const latestIssue = moment('2017-12'); // NOTE: ハードコーティング、仮
  const oldestIssue = moment('2017-1'); // NOTE: ハードコーティング、仮

  const virticalTickMaxNumber = 30; // NOTE: ハードコーティング、仮
  const graphHeight = 600; // NOTE: ハードコーティング、仮
  const graphWidth = 370; // NOTE: ハードコーティング、仮

  return (
    <VictoryChart
      // デフォルトでは横幅を取れるだけ取ろうとするので、staticにする
      containerComponent={<VictoryContainer responsive={false} />}
      height={graphHeight}
      width={graphWidth}
    >
      <VictoryAxis
        /* 横軸 */
        // 目盛りで使用するデータ型の指定
        scale='time'
        // 軸の位置を指定
        orientation='bottom'
        // 目盛りとして使用するデータを渡す
        tickValues={makeHorizontalTickData(oldestIssue, latestIssue)}
        // 目盛りのフォーマットを指定
        // ticlValuesで渡した配列の要素が一つづつ引数に渡される
        tickFormat={issue => {
          // 毎年の1月に年の情報を表示する
          if (issue.getMonth() === 0) {
            // TODO: 年の情報を表示する、ただしデザインを考える
            return `${issue.getMonth() + 1} \n ${issue.getFullYear()}`;
          } else {
            return `${issue.getMonth() + 1}`;
          }
        }}
      />
      <VictoryAxis
        /* 縦軸 */
        dependentAxis
        tickCount={virticalTickMaxNumber}
        // 縦軸の目盛りの値の範囲を指定
        // グラフの縦軸の目盛りが原点から見て降順になるようにするため
        // 負の数から0の範囲を描画するようにする
        domain={[-virticalTickMaxNumber, 0]}
        // 目盛りのフォーマットを指定
        // domainに負の数を渡しているため、それを正の数として表示
        tickFormat={order => Math.abs(order)}
      />
    </VictoryChart>
  );
};

export default Graph;
