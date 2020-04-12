import React from 'react';
import '../styles/tailwind.css';

// サードパーティーライブラリ
import classnames from 'classnames';

// 自作コンポーネント

type ButtonProps = {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
};

const Button = (props: ButtonProps) => {
  const { className, children, onClick } = props;

  return (
    <button
      className={classnames(
        className,
        'px-6 py-1 bg-green-500 text-white rounded'
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
