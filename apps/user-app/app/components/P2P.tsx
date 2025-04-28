"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/Center";
import { TextInput } from "@repo/ui/TextInput";
import Confetti from "react-confetti";
import { p2pTransfer } from "../lib/actions/p2pTransfer";
import axios from "axios";

export function P2P() {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();
  const [suggestions, setSuggestions] = useState([]);
  const [selectedUser, setSelectedUser] = useState<{ name: string; number: string } | null>(null);

  // Handle window resize for confetti
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch user suggestions
  useEffect(() => {
    const fetchUser = async () => {
      if (!number) {
        setSuggestions([]);
        setSelectedUser(null);
        return;
      }
      try {
        const res = await axios.post("/api/search-user", { query: number });
        const data = res.data;
        setSuggestions(data.users || []);
        const exactMatch = data.users.find((u: { number: string }) => u.number === number);
        if (exactMatch) {
          setSelectedUser(exactMatch);
        } else {
          setSelectedUser(null);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setSuggestions([]);
        setSelectedUser(null);
      }
    };
    fetchUser();
  }, [number]);

  // Handle Transfer
  const handleTransfer = async () => {
    if (!number || !amount) {
      setSuccessMessage("Please enter both number and amount.");
      return;
    }

    try {
      await p2pTransfer(number, amount); 
      setIsSuccess(true);
      setSuccessMessage(`Successfully sent ${amount} to ${number}`);
      setTimeout(() => {
        setIsSuccess(false);
        setNumber("");
        setAmount(0);
        setSuccessMessage("");
        setSelectedUser(null);
      }, 3000);
    } catch (error) {
      console.error("Transfer error:", error);
      setSuccessMessage("Transfer failed. Try again.");
    }
  };

  return (
    <div className="h-[90vh]">
      <Center>
        <Card title="Send">
          <div className="min-w-72 pt-2">
            <TextInput
              placeholder="Enter Number Or Name"
              label="Recipient"
              onChange={(value) => {
                setNumber(value);
                setSelectedUser(null);
              }}
              value={number}
            />
            {selectedUser?.name && (
              <div className="text-sm text-white mt-1">Name: {selectedUser.name}</div>
            )}
            {suggestions.length > 0 && !selectedUser && (
              <ul className="mt-2 bg-gray-800 p-2 rounded-md">
                {suggestions.map((user: { name: string; number: string }) => (
                  <li
                    key={user.number}
                    onClick={() => {
                      setNumber(user.number);
                      setSelectedUser(user);
                      setSuggestions([]);
                    }}
                    className="cursor-pointer hover:bg-gray-700 p-1 rounded-md"
                  >
                    {user.name} - {user.number}
                  </li>
                ))}
              </ul>
            )}
            <TextInput
              placeholder="Amount"
              label="Amount"
              onChange={(value) => setAmount(Number(value))}
              // value={amount}
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
