import React from 'react';
import '../styles/tailwind.css';

// サードパーティーライブラリ
import classnames from 'classnames';

// 自作コンポーネント
import TitleListItem from './titleListItem';

type TitleListProps = {
  className?: string;
  comicTitleArray: string[];
  comicColors: Map<string, string>;
};

const TitleList = (props: TitleListProps) => {
  const { className, comicTitleArray, comicColors } = props;

  return (
    <ul className={classnames(className)}>
      {comicTitleArray.map((title, index) => (
        <TitleListItem
          key={index}
          title={title}
          color={comicColors.get(title)}
        />
      ))}
    </ul>
  );
};

export default TitleList;
