'use client';

export default function Dashboard() {
  return (
    <div className="p-6 bg- min-h-screen">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-200 via-purple-400 to-purple-800 bg-clip-text text-transparent  mb-8">Our Services</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Available Service: P2P Money Transfer */}
        <div className="bg-black text-white border border-gray-800 rounded-lg shadow-md p-5 hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">P2P Money Transfer</h2>
          <p className="text-gray-300 mb-4">
            Instantly send and receive money using a name or mobile number — quick and secure.
          </p>
          <span className="inline-block bg-green-800 text-green-200 text-xs font-medium px-3 py-1 rounded-full">
            Available
          </span>
        </div>

        {/* Available Service: Transaction History */}
        <div className="bg-black text-white border border-gray-800 rounded-lg shadow-md p-5 hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">Transaction History</h2>
          <p className="text-gray-300 mb-4">
            View a detailed history of all your recent transactions and transfers.
          </p>
          <span className="inline-block bg-green-800 text-green-200 text-xs font-medium px-3 py-1 rounded-full">
            Available
          </span>
        </div>

        {/* Available Service: Lock Balance */}
        <div className="bg-black text-white border border-gray-800 rounded-lg shadow-md p-5 hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">Lock Balance</h2>
          <p className="text-gray-300 mb-4">
            Temporarily lock a portion of your wallet balance for savings or security.
          </p>
          <span className="inline-block bg-green-800 text-green-200 text-xs font-medium px-3 py-1 rounded-full">
            Available
          </span>
        </div>

        {/* Coming Soon: Bill Payments */}
        <div className="bg-black text-white border border-gray-800 rounded-lg shadow-md p-5 opacity-80 hover:opacity-100 hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">Bill Payments</h2>
          <p className="text-gray-300 mb-4">
            Pay your mobile, internet, or utility bills directly from your wallet.
          </p>
          <span className="inline-block bg-yellow-800 text-yellow-200 text-xs font-medium px-3 py-1 rounded-full">
            Coming Soon
          </span>
        </div>

        {/* Coming Soon: Split the Bill */}
        <div className="bg-black text-white border border-gray-800 rounded-lg shadow-md p-5 opacity-80 hover:opacity-100 hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">Split the Bill</h2>
          <p className="text-gray-300 mb-4">
            Share group expenses easily by splitting bills with friends and tracking payments.
          </p>
          <span className="inline-block bg-yellow-800 text-yellow-200 text-xs font-medium px-3 py-1 rounded-full">
            Coming Soon
          </span>
        </div>
      </div>
    </div>
  );
}
