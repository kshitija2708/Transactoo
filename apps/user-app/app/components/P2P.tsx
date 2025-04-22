"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/Center";
import { TextInput } from "@repo/ui/TextInput";
import Confetti from "react-confetti";

export function P2P() {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleTransfer = () => {
    // Simulate a transfer
    if (number && amount) {
      setIsSuccess(true);
      setSuccessMessage(`Successfully sent ${amount} to ${number}`);
      // Reset fields after a short delay
      setTimeout(() => {
        setIsSuccess(false);
        setNumber("");
        setAmount("");
        setSuccessMessage("");
      }, 3000);
    } else {
      setSuccessMessage("Please enter both number and amount.");
    }
  };

  return (
    <div className="h-[90vh]">
      <Center>
        <Card title="Send">
          <div className="min-w-72 pt-2">
            <TextInput
              placeholder={"Number"}
              label="Number"
              onChange={(value) => setNumber(value)}
              value={number}
            />
            <TextInput
              placeholder={"Amount"}
              label="Amount"
              onChange={(value) => setAmount(value)}
              value={amount}
            />
            <div className="pt-4 flex justify-center">
              <Button onClick={handleTransfer}>{isSuccess ? "Sent" : "Send"}</Button>
              {isSuccess && <Confetti width={windowWidth} height={windowHeight} />}
              {successMessage && (
                <div className="text-center text-green-500 mt-4">
                  {successMessage}
                </div>
              )}
            </div>
          </div>
        </Card>
      </Center>
    </div>
  );
}