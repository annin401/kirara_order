import React from 'react';
import '../styles/tailwind.css';

// サードパーティーライブラリ
import classnames from 'classnames';

// 自作コンポーネント

type SelectComicListItemProps = {
  className?: string;
  onClick?: () => void;
  comicTitle: string;
};

const SelectComicListItem = (props: SelectComicListItemProps) => {
  const { className, comicTitle } = props;

  return (
    <li className={classnames(className, 'flex py-3 bg-gray-400 rounded')}>
      <input type='checkbox' className='mx-4' />
      <span className='text-gray-900'>{comicTitle}</span>
    </li>
  );
};

export default SelectComicListItem;
