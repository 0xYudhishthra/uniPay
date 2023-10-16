import type { NextPage } from "next";
import Head from "next/head";
import { MerchantSignupView } from "../views";

const MerchantSignup: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>UniPay - Merchant Signup</title>
        <meta name="description" content="This site will fly high 🦤" />
      </Head>
      <MerchantSignupView />
    </div>
  );
};

export default MerchantSignup;
