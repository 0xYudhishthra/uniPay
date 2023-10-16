import type { NextPage } from "next";
import Head from "next/head";
import { HomeView } from "../views";

const Home: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>UniPay - Home</title>
        <meta name="description" content="Unified POS & Crypto Bliss ⚡️" />
      </Head>
      <HomeView />
    </div>
  );
};

export default Home;
