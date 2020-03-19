import React from 'react';
import '../styles/tailwind.css';

import { Close } from '@material-ui/icons';

type TitleTagProps = {
  title: string;
};

const TitleTag = (props: TitleTagProps) => {
  const { title } = props;
  return (
    <li>
      <span>{title}</span>
      <button className="p-2">
        <Close />
      </button>
    </li>
  );
};

export default TitleTag;
