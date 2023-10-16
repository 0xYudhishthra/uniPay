import React, { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

export const MerchantPayView: React.FC = () => {
  const { publicKey } = useWallet();
  const [paymentStatus, setPaymentStatus] = useState<
    "awaiting" | "confirming" | "conversion" | "completed"
  >("awaiting");

  // Simulating the payment flow for demonstration purposes
  useEffect(() => {
    switch (paymentStatus) {
      case "confirming":
        setTimeout(() => {
          setPaymentStatus("conversion");
        }, 2000);
        break;

      case "conversion":
        setTimeout(() => {
          setPaymentStatus("completed");
        }, 2000);
        break;

      default:
        break;
    }
  }, [paymentStatus]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-black relative overflow-hidden">
      {/* Product Name */}
      <h1 className="text-2xl text-white font-bold mb-4">UniPay | Merchant</h1>

      {/* Payment status display */}
      {paymentStatus === "awaiting" && (
        <p className="text-xl text-gray-300">Awaiting payment...</p>
      )}
      {paymentStatus === "confirming" && (
        <p className="text-xl text-blue-500">Payment confirming...</p>
      )}
      {paymentStatus === "conversion" && (
        <>
          <p className="text-xl text-green-500">
            USDT converted to your preferred stablecoin: USDC
          </p>
          {publicKey && (
            <p className="text-xl text-gray-300 mt-2">
              to wallet address: {publicKey.toBase58()}
            </p>
          )}
        </>
      )}
      {paymentStatus === "completed" && (
        <p className="text-xl text-green-600">
          Payment successfully completed and deposited to wallet!
        </p>
      )}

      {/* Button for demo purposes */}
      {paymentStatus === "awaiting" && (
        <button
          onClick={() => setPaymentStatus("confirming")}
          className="mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-all duration-300"
        >
          Demo: Initiate Payment Received
        </button>
      )}
    </div>
  );
};

export default MerchantPayView;
