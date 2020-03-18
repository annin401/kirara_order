import React from 'react';
import Header from './header';
import { useStaticQuery, graphql } from 'gatsby';

type LayoutProps = {
  children?: React.ReactChild[];
};

const Layout = (props: LayoutProps) => {
  const { children } = props;
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      {children}
    </>
  );
};

export default Layout;
