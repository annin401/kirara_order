import React from 'react';
import '../styles/tailwind.css';

// サードパーティーライブラリ
import classnames from 'classnames';
import ReactModal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { navigate } from 'gatsby';

// 自作コンポーネント
import Button from './button';
import SelectComicListItem from './selectComicListItem';

import searchIndex from '../data/searchIndex.json';

type AddComicModalProps = {
  className?: string;
  isOpen: boolean;
  onRequestClose: () => void;
};

const AddComicModal = (props: AddComicModalProps) => {
  const { className, isOpen, onRequestClose } = props;

  const [selectedTitles, setSelelectedTitles] = React.useState(
    searchIndex.titleList.map(title => ({ title: title, isSelected: false }))
  );

  const switchItemSelect = (index: number) => {
    let copy = selectedTitles.slice();
    copy[index].isSelected = !copy[index].isSelected;
    setSelelectedTitles(copy);
  };

  const handleClickAddButton = () => {
    const titles = [];
    for (let item of selectedTitles) {
      if (item.isSelected) titles.push(item.title);
    }

    const urlParam = titles.join('-and-');

    // 遷移
    navigate(`/app/${urlParam}`);

    // モーダルを閉じる
    onRequestClose();
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel='追加する漫画のグラフを選択するモーダル'
      className={classnames(className)}
    >
      <div className='flex'>
        <button onClick={onRequestClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <Button className='ml-auto' onClick={handleClickAddButton}>
          追加
        </Button>
      </div>
      <ul>
        {selectedTitles.map((value, index) => (
          <SelectComicListItem
            key={index}
            comicTitle={value.title}
            isSelected={value.isSelected}
            onClick={() => {
              switchItemSelect(index);
            }}
          />
        ))}
      </ul>
    </ReactModal>
  );
};

export default AddComicModal;
