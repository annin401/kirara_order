import React from 'react';
import '../styles/tailwind.css';

import { Link } from 'gatsby';

// 自作コンポーネント
import Layout from '../components/layout';

const IndexPage = () => {
  return (
    <Layout>
      <p className='mb-8'>
        「まんがタイムきらら」に連載された作品の掲載順をグラフ化し表示します
      </p>
      <p className='mb-4 text-xl font-bold'>スマホでみてネ！</p>
      <Link
        to='/app/'
        className='text-center inline-block min-w-full bg-green-500 text-white py-3 mb-8 rounded text-xl focus:bg-green-600 xl:min-w-0 xl:px-8 xl:text-base'
      >
        Get Started！
      </Link>
      <h2 className='mb-4 text-xl font-bold'>このサイトについて</h2>
      <p>
        このサイトは、プロラボ春ハッカソンで作られた、Kirara
        Orderのプロトタイプ版です。 正式版は1、2ヶ月後にきっと出ると思います。
        <br />
        <br />
        Kirara
        Orderとは、「まんがタイムきらら」に連載された作品の掲載順をグラフ化し表示するサイトのことです。詳しくはエントリーと同時に投稿したブログの記事を読んでください。
        <br />
        <br />
        このプロトタイプ版では、きららMAXに連載された作品の中から独断と偏見で選んだ13作品の、2018年の1月号~2020年の5月号までの掲載順をグラフ化できます。
        <br />
        <br />
        なおこのプロトタイプ版は、予告なく公開を停止する可能性があります。いやきっとします。
      </p>
    </Layout>
  );
};

export default IndexPage;
