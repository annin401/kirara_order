import React from 'react';

// サードパーティーライブラリ
import { useStaticQuery, graphql } from 'gatsby';
import { css } from '@emotion/core';

// 自作コンポーネント
import Header from './header';

type LayoutProps = {
  children?: React.ReactNode;
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
    <div
      className='mx-auto'
      css={css`
        max-width: 400px;
      `}
    >
      <Header siteTitle={data.site.siteMetadata.title} />
      <main className='px-4'>{children}</main>
    </div>
  );
};

export default Layout;
