import type { NextPage } from "next";
import Head from "next/head";
import { PayerScanView } from "../views";

const PayerScan: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>UniPay - Home</title>
        <meta name="description" content="Unified POS & Crypto Bliss ⚡️" />
      </Head>
      <PayerScanView />
    </div>
  );
};

export default PayerScan;
