import React from 'react';
import '../styles/tailwind.css';

// サードパーティーライブラリ
import classnames from 'classnames';
import { RouteComponentProps } from '@reach/router';

// 自作コンポーネント
import Graph from '../components/graph';

type GraphAreaProps = RouteComponentProps & {
  className?: string;
};

// グラフ部分以外は静的サイトにしておきたいため、
// グラフ部分のみ別のコンポーネントとして分けている
const GraphArea = (props: GraphAreaProps) => {
  const { className } = props;

  return (
    <div className={classnames(className)}>
      <Graph />
    </div>
  );
};

export default GraphArea;
