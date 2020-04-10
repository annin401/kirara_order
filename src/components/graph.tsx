import React from 'react';
import '../styles/tailwind.css';

import moment, { Moment } from 'moment';
import {
  VictoryChart,
  VictoryAxis,
  VictoryZoomContainer,
  VictoryLine,
  VictoryTheme,
} from 'victory';

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

function makeVirticalTickData(worstOrder: number) {
  let tickArray = [];
  // 間違って負の数が来た時でも正の数に直す
  worstOrder = Math.abs(worstOrder);

  for (let i = 0; i <= worstOrder; ++i) {
    // グラフの縦軸の目盛りが原点から見て降順になるようにするため
    // 負の数の配列にしている
    tickArray.push(-i);
  }
  return tickArray;
}

type productionOrderArray = {
  issue: string;
  order: number;
  isCover: boolean;
  isColor: boolean;
  isDouble: boolean;
  isGuest: boolean; //　NOTE: 現在の構想ではゲストの情報はいらないためいずれ消す
}[];

type zoomDomain = {
  x: [Date, Date];
  y: [number, number];
};

type GraphProps = {};

const Graph = (props: GraphProps) => {
  const {} = props;

  const [POArray, setPOArray] = React.useState<productionOrderArray>([]); // NOTE: 仮
  const [zoomDomain, setZoomDomain] = React.useState<zoomDomain>({
    x: [new Date(2019, 0), new Date(2019, 11)], // NOTE: ハードコーティング
    y: [-30, 0], // NOTE: ハードコーティング
  });

  const graphHeight = 600; // NOTE: ハードコーティング、仮
  const graphWidth = 370; // NOTE: ハードコーティング、仮
  const worstOrder = 30; // 縦軸で一番したの目盛りの値、正の数で指定

  React.useEffect(() => {
    const title = 'いのち短し善せよ乙女'; // NOTE: ハードコーティング
    import(`../../static/${title}.json`).then(json => {
      const orderArray = json.default.list;
      setPOArray(orderArray);

      setZoomDomain({
        x: [
          moment(orderArray[orderArray.length - 1].issue)
            .add(-11, 'months') // NOTE: 11ヶ月のところがハードコーティング, 横幅によって変える
            .toDate(),
          moment(orderArray[orderArray.length - 1].issue).toDate(),
        ],
        y: [-worstOrder, 0], // マイナスにするのを忘れない！
      });
    });
  }, []);

  // NOTE: propsからくるオブジェクトの構造次第でこの関数は壊れます
  // あとで書き換える前提。
  const getOldestIssue = () => {
    if (typeof POArray !== 'undefined' && POArray.length !== 0) {
      return moment(POArray[0].issue);
    } else {
      const defaultOldestIssue = moment('2019-1'); // NOTE: ハードコーティング
      return defaultOldestIssue;
    }
  };
  const getLatestIssue = () => {
    if (typeof POArray !== 'undefined' && POArray.length !== 0) {
      return moment(POArray[POArray.length - 1].issue);
    } else {
      const defaultLatestIssue = moment('2019-12'); // NOTE: ハードコーティング
      return defaultLatestIssue;
    }
  };

  return (
    <VictoryChart
      // デフォルトでは横幅を取れるだけ取ろうとするので、staticにする
      containerComponent={
        <VictoryZoomContainer
          zoomDomain={{
            x: zoomDomain.x,
            y: zoomDomain.y,
          }}
          allowZoom={false}
          zoomDimension='x'
          responsive={false}
        />
      }
      height={graphHeight}
      width={graphWidth}
      theme={VictoryTheme.material}
    >
      <VictoryAxis
        /* 横軸 */
        // 目盛りで使用するデータ型の指定
        scale='time'
        // 軸の位置を指定
        orientation='bottom'
        // 目盛りとして使用するデータを渡す
        tickValues={makeHorizontalTickData(getOldestIssue(), getLatestIssue())}
        // 目盛りのフォーマットを指定
        // ticlValuesで渡した配列の要素が一つづつ引数に渡される
        tickFormat={(issue: Date) => {
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
        // 通常VictoryAxisでは、目盛りの値の大きさを原点から見て降順に配置することができない
        // (直交座標のようにしか配置できない)。そのため、直交座標でいうと第四象限に当たる場所を
        // 描画に使うことにした。
        // そのため、縦軸の目盛りはデータ上は負の数であるが、表示では絶対値を表示している。
        dependentAxis
        tickValues={makeVirticalTickData(worstOrder)}
        // 目盛りのフォーマットを指定
        // tickValuesに負の数を渡しているため、それを正の数として表示
        tickFormat={(order: number) => Math.abs(order)}
      />
      <VictoryLine // 仮
        data={POArray.map(value => ({
          x: moment(value.issue).toDate(),
          y: -value.order,
        }))}
      />
    </VictoryChart>
  );
};

export default Graph;
