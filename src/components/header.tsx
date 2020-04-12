import React from 'react';
import { Link } from 'gatsby';

type HeaderProps = {
  siteTitle: string;
};

const Header = (props: HeaderProps) => {
  const { siteTitle } = props;
  return (
    <header className='text-gray-900 font-bold px-4 py-5 text-2xl md:text-4xl md:px-8 md:py-8'>
      <Link to='/'>{siteTitle}</Link>
    </header>
  );
};

export default Header;
