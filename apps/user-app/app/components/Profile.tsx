"use client"
import { Phone } from "lucide-react"
import { MdAccountBalanceWallet } from "react-icons/md"
import { RxAvatar } from "react-icons/rx"

interface User {
  name: string
  phoneno: string
  bankName: string
  lockedBalance: number
}

export function Profile() {
  const user: User = {
    name: "John Doe",
    phoneno: "123-456-7890",
    bankName: "XYZ Bank",
    lockedBalance: 2500.75,
  }

  return (        
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col bg-black border border-purple-400 rounded-2xl shadow-lg shadow-purple-300 p-6 w-full max-w-md space-y-4">
        <div className="flex justify-center">
          <RxAvatar color="white" size={78} />
        </div>

        <div>
          <p className="text-sm text-white mb-1">Name</p>
          <p className="text-white border rounded-lg p-2">{user.name}</p>
        </div>

        <div>
          <p className="text-sm text-white mb-1 flex items-center gap-2">
            <Phone size={18} /> Mobile No.
          </p>
          <p className="text-white border rounded-lg p-2">{user.phoneno}</p>
        </div>

        <div>
          <p className="text-sm text-white mb-1 flex items-center gap-2">
            <MdAccountBalanceWallet size={18} /> Bank Name
          </p>
          <p className="text-white border rounded-lg p-2">{user.bankName}</p>
        </div>

        <div>
          <p className="text-sm text-white mb-1">Unlock the balance</p>
          <p className="text-white border rounded-lg p-2">${user.lockedBalance.toFixed(2)}</p>
        </div>
      </div>
    </div>
  )
}
