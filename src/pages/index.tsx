import React from 'react';
import '../styles/tailwind.css';

// 自作コンポーネント
import Layout from '../components/layout';
import SearchBar from '../components/searchBar';
import TitleTag from '../components/titleTag';

const IndexPage = () => {
  return (
    <Layout>
      <SearchBar />
      <ul>
        <TitleTag title="title" />
      </ul>
    </Layout>
  );
};

export default IndexPage;
