import React from 'react';
import '../styles/tailwind.css';

import { RouteComponentProps } from '@reach/router';

// グラフ部分以外は静的サイトにしておきたいため、
// グラフ部分のみ別のコンポーネントとして分けている
const GraphArea = (props: RouteComponentProps) => {
  return <p>作品がここにかかれるよ</p>;
};

export default GraphArea;
