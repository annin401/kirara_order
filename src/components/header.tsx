import React from 'react';
import { Link } from 'gatsby';

type HeaderProps = {
  siteTitle: string;
};

const Header = (props: HeaderProps) => {
  const { siteTitle } = props;
  return <Link to="/">Kirara Order</Link>;
};

export default Header;
