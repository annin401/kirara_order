import React from 'react';
import '../styles/tailwind.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

type TitleTagProps = {
  title: string;
};

const TitleTag = (props: TitleTagProps) => {
  const { title } = props;
  return (
    <li>
      <span>{title}</span>
      <button className="p-2">
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </li>
  );
};

export default TitleTag;
