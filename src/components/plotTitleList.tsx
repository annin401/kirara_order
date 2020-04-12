import React from 'react';
import '../styles/tailwind.css';

// サードパーティーライブラリ
import classnames from 'classnames';

// 自作コンポーネント
import TitleListItem from './plotTitleListItem';

type PlotTitleListProps = {
  className?: string;
  comicTitleArray: string[];
  comicColors: Map<string, string>;
};

const PlotTitleList = (props: PlotTitleListProps) => {
  const { className, comicTitleArray, comicColors } = props;

  return (
    <ul className={classnames(className)}>
      {comicTitleArray.map((title, index) => (
        <TitleListItem
          key={index}
          title={title}
          color={comicColors.get(title)}
          className='md:text-2xl'
        />
      ))}
    </ul>
  );
};

export default PlotTitleList;
