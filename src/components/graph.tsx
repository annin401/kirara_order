import React from 'react';
import '../styles/tailwind.css';

import moment, { Moment } from 'moment';
import randomcolor from 'randomcolor/randomcolor';
import {
  VictoryChart,
  VictoryAxis,
  VictoryZoomContainer,
  VictoryLine,
  VictoryTheme,
} from 'victory';

// TODO: この関数の名前をもっとわかりやすいものに変える
function extractDate(dateStr: string) {
  // "YYYY-MM"の形式からオブジェクトに直す
  const splitedStr = dateStr.split('-');
  return {
    year: Number(splitedStr[0]),
    month: Number(splitedStr[1]) - 1,
  };
}

// issue の意味は「月号(3月号とかの月号)」
function makeHorizontalTickData(oldestIssue: Date, latestIssue: Date) {
  let tickArray: Date[] = [];
  const addDate = (year: number, month: number) => {
    tickArray.push(new Date(year, month));
  };

  const oldestYear = oldestIssue.getFullYear();
  const newestYear = latestIssue.getFullYear();
  const monthOfOldestYear = oldestIssue.getMonth();
  const monthOfNewestYear = latestIssue.getMonth();

  // 横軸で表示する目盛りとして用いるデータを生成
  for (let year = oldestYear; year <= newestYear; ++year) {
    if (year === oldestYear && year === newestYear) {
      for (let month = monthOfOldestYear; month <= monthOfNewestYear; ++month) {
        addDate(year, month);
      }
    } else if (year === oldestYear) {
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

type ComicInfo = {
  issue: string;
  order: number;
  isCover: boolean;
  isColor: boolean;
  isDouble: boolean;
  isGuest: boolean; //　NOTE: 現在の構想ではゲストの情報はいらないためいずれ消す
};

type zoomDomain = {
  x: [Date, Date];
  y: [number, number];
};

type GraphProps = {
  comicTitleArray: string[];
  // NOTE: スーバーハードコーティング、型を共有する方法を探す
  comicInfoMap: Map<string, ComicInfo[]>;
  comicColors: Map<string, string>;
  setComicColors: React.Dispatch<React.SetStateAction<Map<string, string>>>;
};

const Graph = (props: GraphProps) => {
  const { comicTitleArray, comicInfoMap, comicColors } = props;
  const { setComicColors } = props;

  const [xDomain, setXDomain] = React.useState({
    oldestIssue: new Date(2015, 0), // NOTE: ハードコーティング、初期値
    latestIssue: new Date(), // NOTE: ハードコーティング、初期値
  });
  const [zoomDomain, setZoomDomain] = React.useState<zoomDomain>({
    x: [new Date(2019, 0), new Date(2019, 11)], // NOTE: ハードコーティング、初期値
    y: [-30, 0], // NOTE: ハードコーティング、初期値
  });

  const graphHeight = 600; // NOTE: ハードコーティング、仮
  const graphWidth = 370; // NOTE: ハードコーティング、仮
  const worstOrder = 30; // 縦軸で一番したの目盛りの値、正の数で指定

  React.useEffect(() => {
    // propsで渡ってきたデータから、グラフの大きさを決定する
    // 起動時は、選択した作品の中で最も最新の月からnヶ月分前までを表示する
    // nはブラウザの横幅によって変える

    // データが取得できていないときは終了する
    if (comicInfoMap.size === 0) return;

    // なるだけ古いor新しい日時で初期化する
    // きららは2002年創刊であるため十分古い月日である
    let latestIssueInEveryComic = moment(extractDate('2000-1'));
    let oldestIssueInEveryComic = moment(); // 現在の月日が入る

    comicInfoMap.forEach((value, key) => {
      const latestIssueInEachComic = moment(
        extractDate(value[value.length - 1].issue)
      );
      if (latestIssueInEachComic.isAfter(latestIssueInEveryComic)) {
        // 更新
        latestIssueInEveryComic = moment(latestIssueInEachComic);
      }

      const oldestIssueInEachComic = moment(extractDate(value[0].issue));
      if (oldestIssueInEachComic.isBefore(oldestIssueInEveryComic)) {
        // 更新
        oldestIssueInEveryComic = moment(oldestIssueInEachComic);
      }
    });

    setXDomain({
      oldestIssue: oldestIssueInEveryComic.toDate(),
      latestIssue: latestIssueInEveryComic.toDate(),
      // yのdomainを管理しない理由は、zoomDomainの値で固定されるため、管理する必要がないから
    });

    setZoomDomain({
      x: [
        moment(latestIssueInEveryComic) // コピーを作っている
          .add(-11, 'months') // NOTE: 11ヶ月のところがハードコーティング, 横幅によって変える
          .toDate(),
        moment(latestIssueInEveryComic).toDate(),
      ],
      y: [-worstOrder, 0], // マイナスにするのを忘れない！
    });
  }, [comicTitleArray, comicInfoMap]);

  React.useEffect(() => {
    // 作品の折れ線グラフにつける色を決める

    if (comicTitleArray.length === 0) return;

    // 色をランダムで生成。
    // 背景(白)にあうようにluminisityをdarkにしている
    // TODO: 色が被らないandとても似た色にならないことを保証する
    const colors = randomcolor({
      count: comicTitleArray.length,
      luminosity: 'dark',
    });
    const colorMap = new Map<string, string>();

    comicTitleArray.forEach((title, index) => {
      colorMap.set(title, colors[index]);
    });

    setComicColors(colorMap);
  }, [comicTitleArray]);

  const makeLine = () => {
    let lines: [{ x: Date; y: number }[]] = [];
    let lineColors: string[] = []; // linesと同期してる

    // VictoryLienに渡すデータの配列を生成
    comicInfoMap.forEach((infoArray, title) => {
      for (let i = 0; i < infoArray.length; ++i) {
        const issue = infoArray[i].issue;
        const order = infoArray[i].order;

        if (i === 0) {
          const newData = {
            x: moment(issue).toDate(),
            y: order,
          };

          const newLine = [newData];
          const lineColor = comicColors.get(title);
          lineColors.push(lineColor ? lineColor : '#000000');

          lines.push(newLine);
        } else {
          const beforeIssue = infoArray[i - 1].issue;

          // 前回の月日との差が一ヶ月しかなければ
          if (moment(issue).isSame(moment(beforeIssue).add(1, 'month'))) {
            const newData = {
              x: moment(issue).toDate(),
              y: order,
            };

            let lastLine = lines.slice(-1)[0];
            lastLine.push(newData);

            lines[lines.length - 1] = lastLine;
          } else {
            const newData = {
              x: moment(issue).toDate(),
              y: order,
            };
            const newLine = [newData];
            const lineColor = comicColors.get(title);
            lineColors.push(lineColor ? lineColor : '#000000');

            lines.push(newLine);
          }
        }
      }
    });

    return lines.map((line, index) => (
      <VictoryLine
        key={index}
        data={line.map(info => ({
          x: info.x,
          y: -info.y, // マイナスを忘れない
        }))}
        style={{
          data: {
            stroke: lineColors[index],
          },
        }}
      />
    ));
  };

  return (
    <>
      {/* 必ずcomicInfoMapで確認をとる、comicTitleArrayでは失敗する可能性がある */}
      {comicInfoMap.size === 0 ? (
        <p>Looding...</p>
      ) : (
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
            tickValues={makeHorizontalTickData(
              xDomain.oldestIssue,
              xDomain.latestIssue
            )}
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
          {makeLine()}
        </VictoryChart>
      )}
    </>
  );
};

export default Graph;
