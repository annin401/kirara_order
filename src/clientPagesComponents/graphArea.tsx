import React from 'react';
import '../styles/tailwind.css';

// サードパーティーライブラリ
import classnames from 'classnames';
import { RouteComponentProps } from '@reach/router';

// 自作コンポーネント
import Graph from '../components/graph';

type comicInfoJson = {
  default: {
    meta: {
      title: string;
    };
    list: {
      issue: string;
      order: number;
      isCover: boolean;
      isColor: boolean;
      isDouble: boolean;
      isGuest: boolean; //　NOTE: 現在の構想ではゲストの情報はいらないためいずれ消す
    }[];
  };
};

type GraphAreaProps = RouteComponentProps & {
  className?: string;
  // NOTE: 本当は@reach/routerのURLパラメータとして与えられる
  // が、それをTypeScriptで表現する手段がないため無理やりエラーを踏み潰している
  urlParams?: string;
};

// グラフ部分以外は静的サイトにしておきたいため、
// グラフ部分のみ別のコンポーネントとして分けている
const GraphArea = (props: GraphAreaProps) => {
  const { className, urlParams } = props;

  const [comicTitleArray, setComicTitleArray] = React.useState<string[]>([]);
  const [comicInfo, setComicInfo] = React.useState({});

  React.useEffect(() => {
    // URLパラメータからグラフ化する作品の情報を抜き出し、importして、stateに保存する

    let existingUrlParms = typeof urlParams === 'undefined' ? '' : urlParams;

    const titles = existingUrlParms.split('-and-');

    // Promise(import)を並列して行うため、Promiseの配列を生成する
    let downloadedJsons: comicInfoJson[] = [];
    let promiseList = [];
    for (let title of titles) {
      // URLではパーセンドエンコーディングされたものではなく、utf-8のものがくると仮定している
      const encodedTitle = encodeURI(title);

      // 動的インポートを行うPromiseを生成
      const p = import(`../../static/${encodedTitle}.json`)
        .then((json: comicInfoJson) => {
          downloadedJsons.push(json);
        })
        .catch(error => console.log(error));

      promiseList.push(p);
    }

    // 全てのPromiseが完了したらthenに書かれた処理が実行される
    // 一つでも失敗するとcatchの処理となる
    Promise.all(promiseList)
      .then(() => {
        setComicTitleArray(titles);

        // useStateでは同期的にstateが更新されないため、一度ローカル変数に全て保存した後、stateを更新する
        let info = {};
        for (let i = 0; i < titles.length; ++i) {
          const newComicInfo = { [titles[i]]: downloadedJsons[i].default.list };
          info = { ...info, ...newComicInfo };
        }
        setComicInfo(info);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div className={classnames(className)}>
      <Graph />
    </div>
  );
};

export default GraphArea;
