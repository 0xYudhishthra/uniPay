import React from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export const MerchantPayView: React.FC = () => {
  const { publicKey } = useWallet();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-black relative overflow-hidden">
      <div className="text-center z-10 space-y-6 md:max-w-3xl">
        <h1 className="text-5xl font-extrabold text-white mb-2 hover:text-blue-500 transition-all duration-300 cursor-pointer shadow-md transform hover:scale-105">
          Accept Cryptocurrencies
        </h1>
        <p className="text-2xl text-gray-300 hover:text-gray-100 transition-all duration-300 cursor-pointer shadow-md transform hover:scale-105">
          Empower your business by accepting various cryptocurrencies.
          Auto-convert with minimal fees. Transfers are instant with Solana
          integration.
        </p>

        {publicKey ? (
          <p className="text-white">Connected as: {publicKey.toBase58()}</p>
        ) : (
          <button>
            <WalletMultiButton className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full focus:outline-none shadow-xl transform hover:scale-110 transition-transform duration-300" />
          </button>
        )}
      </div>
    </div>
  );
};

export default MerchantPayView;
