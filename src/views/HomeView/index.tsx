import React, { useRef } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { MainContent } from "../../components";

export const HomeView: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { publicKey } = useWallet();

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-black relative overflow-hidden"
    >
      <MainContent publicKey={publicKey} />
      {/* <Globe containerRef={containerRef} /> */}
      {/* <Banner direction="left">
        POWERED BY SOLANA
        <img
          src="/solana-sol-logo.png"
          alt="Solana Logo"
          className="h-6 ml-2"
        />
      </Banner>
      <Banner direction="right">
        POWERED BY SOLANA
        <img
          src="/solana-sol-logo.png"
          alt="Solana Logo"
          className="h-6 ml-2"
        />
      </Banner> */}
    </div>
  );
};

export default HomeView;
