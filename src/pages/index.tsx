import React from 'react';
import '../styles/tailwind.css';

import Layout from '../components/layout';
import SearchBar from '../components/searchBar';

const IndexPage = () => {
  return (
    <Layout>
      <SearchBar />
    </Layout>
  );
};

export default IndexPage;
