import React from 'react';
import '../styles/tailwind.css';

import { Router } from '@reach/router';

// 自作コンポーネント
import Layout from '../components/layout';
import AddComicModal from '../components/addComicModal';
import GraphArea from '../clientPagesComponents/graphArea';

const App = () => {
  const Default = (props: { path: string }) => <p>作品が選択されていません</p>; // 仮, Defauot というコンポーネント名前も仮

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <Layout>
      <button
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        追加
      </button>
      <AddComicModal
        isOpen={isModalOpen}
        onRequestClose={() => {
          setIsModalOpen(false);
        }}
      />

      {/* client-only-routing */}
      <Router basepath='/app'>
        <GraphArea path='/:urlParams' />
        <Default path='/' />
      </Router>
    </Layout>
  );
};

export default App;
