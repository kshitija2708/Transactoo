"use client"; // Enables client-side data fetching
import { useEffect, useState } from "react";
import axios from "axios";

interface Transfer {
    id: number;
    amount: number;
    timestamp: string;
    fromUserId: number;
    toUserId: number;
    transactionId: string;
    fromUser: { name: string; email: string };
    toUser: { name: string; email: string };
}

export default function Transfers() {
    const [transfers, setTransfers] = useState<Transfer[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTransfers() {
            try {
                const response = await axios.get("/api/transfers");
                setTransfers(response.data);
            } catch (error) {
                console.error("Error fetching transfers:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchTransfers();
    }, []);

    if (loading) return <p className="text-center">Loading transactions...</p>;

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-200 via-purple-400 to-purple-800 bg-clip-text text-transparent  mb-8 ">Transaction History</h2>
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-purple-300">
                        <th className="border-purple-200 p-2">Transaction ID</th>
                        <th className="border p-2">From</th>
                        <th className="border p-2">To</th>
                        <th className="border p-2">Amount</th>
                        <th className="border p-2">Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {transfers.map((transfer) => (
                        <tr key={transfer.id} className="text-center text-white">
                            <td className="border p-2">{transfer.transactionId}</td>
                            <td className="border p-2">{transfer.fromUser.name} </td>
                            <td className="border p-2">{transfer.toUser.name} </td>
                            <td className="border p-2">${transfer.amount}</td>
                            <td className="border p-2">{new Date(transfer.timestamp).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
