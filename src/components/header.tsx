import React from 'react';
import { Link } from 'gatsby';

type HeaderProps = {
  siteTitle: string;
};

const Header = (props: HeaderProps) => {
  const { siteTitle } = props;
  return (
    <header className='text-2xl text-gray-900 font-bold px-4 py-5'>
      <Link to='/'>{siteTitle}</Link>
    </header>
  );
};

export default Header;
