import React from 'react';
import '../styles/tailwind.css';

// サードパーティーライブラリ
import classnames from 'classnames';
import ReactModal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

// 自作コンポーネント
import AddButton from './addButton';
import SelectComicListItem from './selectComicListItem';

type AddComicModalProps = {
  className?: string;
  isOpen: boolean;
  onRequestClose: () => void;
};

const AddComicModal = (props: AddComicModalProps) => {
  const { className, isOpen, onRequestClose } = props;

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
        <AddButton className='ml-auto'>追加</AddButton>
      </div>
      <ul>
        <SelectComicListItem comicTitle={'gotiusa'} />
      </ul>
    </ReactModal>
  );
};

export default AddComicModal;
