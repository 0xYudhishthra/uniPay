import type { NextPage } from "next";
import Head from "next/head";
import { MerchantPayView } from "../views";

const MerchantPay: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>UniPay - Merchant Pay</title>
        <meta name="description" content="This site will fly high 🦤" />
      </Head>
      <MerchantPayView />
    </div>
  );
};

export default MerchantPay;
