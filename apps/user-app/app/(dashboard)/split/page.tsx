'use client';

import { useState } from 'react';

export default function CreateBillForm({ currentUserId, friendIds }: { currentUserId: number; friendIds: number[] }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);

  const handleSubmit = async () => {
    const res = await fetch('/api/bill/create', {
      method: 'POST',
      body: JSON.stringify({
        title,
        totalAmount: amount,
        creatorId: currentUserId,
        participantIds: [currentUserId, ...friendIds],
      }),
    });

    const data = await res.json();
    console.log('Created bill:', data);
  };

  return (
    <div>
      <input placeholder="Dinner at Bob's" onChange={(e) => setTitle(e.target.value)} />
      <input type="number" placeholder="Total Amount" onChange={(e) => setAmount(Number(e.target.value))} />
      <button onClick={handleSubmit}>Create Bill</button>
    </div>
  );
}
