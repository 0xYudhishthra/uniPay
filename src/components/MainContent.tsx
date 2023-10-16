import React from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { PublicKey } from "@solana/web3.js";

interface MainContentProps {
  publicKey: PublicKey | null;
}

export const MainContent = ({ publicKey }: MainContentProps) => (
  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10 space-y-4">
    <h1 className="text-5xl font-extrabold text-white mb-2 hover:text-blue-500 transition-all duration-300 cursor-pointer shadow-md transform hover:scale-105">
      UniPay
    </h1>
    <p className="text-2xl text-gray-300 hover:text-gray-100 transition-all duration-300 cursor-pointer shadow-md transform hover:scale-105">
      Where Blockchain Meets User-Friendly POS
    </p>
    {publicKey ? (
      <p className="text-white">Connected as: {publicKey.toBase58()}</p>
    ) : (
      <button>
        <WalletMultiButton className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full focus:outline-none shadow-xl transform hover:scale-110 transition-transform duration-300" />
      </button>
    )}
  </div>
);
