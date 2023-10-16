import React, { useState, useEffect } from "react";
import QRCode from "qrcode.react";

export const PayerScanView: React.FC = () => {
  const [amount, setAmount] = useState<string>("");
  const [qrValue, setQRValue] = useState<string | null>(null);
  const [step, setStep] = useState<
    "input" | "generate" | "waiting" | "confirmed"
  >("input");

  // When the merchant hits "generate", we'll convert the amount into a QR code.
  useEffect(() => {
    if (step === "generate") {
      setQRValue(`unipay:${amount}`);
      setTimeout(() => setStep("waiting"), 1000); // Simulate delay in generating QR
    }
  }, [amount, step]);

  // Demoing user scanning and payment confirmation after some time
  useEffect(() => {
    if (step === "waiting") {
      setTimeout(() => setStep("confirmed"), 2000); // Simulate 5 seconds delay for payment confirmation
    }
  }, [step]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-black">
      <h2 className="text-2xl text-white font-bold mb-4">UniPay | Merchant</h2>

      {step === "input" && (
        <div className="flex flex-col items-center space-y-4">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="p-2 rounded-md border-2 border-white focus:border-blue-500 bg-transparent text-white"
          />
          <button
            onClick={() => setStep("generate")}
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-all duration-300"
          >
            Generate QR
          </button>
        </div>
      )}

      {step === "generate" && (
        <p className="text-xl text-gray-300">Generating QR...</p>
      )}

      {step === "waiting" && (
        <>
          <QRCode value={qrValue || "loading"} size={128} />
          <p className="text-xl text-gray-300 mt-4">Awaiting user payment...</p>
        </>
      )}

      {step === "confirmed" && (
        <p className="text-xl text-green-600">Payment successfully received!</p>
      )}
    </div>
  );
};

export default PayerScanView;
