import React from 'react';
import '../styles/tailwind.css';
import { css } from '@emotion/core';
import tw from 'tailwind.macro';

// サードパーティーライブラリ
import classnames from 'classnames';

// 自作コンポーネント

type TitleListItemProps = {
  className?: string;
  title: string;
  color?: string;
};

const TitleListItem = (props: TitleListItemProps) => {
  const { className, title, color } = props;

  const style = {
    color: color ? color : '#000000',
  };

  return (
    <li className={classnames(className)} style={style}>
      <div
        css={css`
          background-color: ${color};
          display: inline;
          padding: 0 8px 0 8px;
        `}
      ></div>
      {title}
    </li>
  );
};

export default TitleListItem;
