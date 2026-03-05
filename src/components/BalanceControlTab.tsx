import { useState } from 'react';
import { Plus } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  balance?: number;
  [key: string]: any;
}

interface BalanceControlTabProps {
  allUsers: User[];
  addBalance: (userId: string, amount: number) => void;
  removeBalance: (userId: string, amount: number) => void;
}

export function BalanceControlTab({ allUsers, addBalance, removeBalance }: BalanceControlTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [amountToAdd, setAmountToAdd] = useState('');

  const filteredUsers = allUsers.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddBalance = () => {
    if (selectedUserId && amountToAdd) {
      const amount = parseFloat(amountToAdd);
      if (amount > 0) {
        addBalance(selectedUserId, amount);
        setAmountToAdd('');
        alert('✅ Balance of $' + amount + ' added successfully');
      }
    }
  };

  const handleQuickAdd = (userId: string) => {
    setSelectedUserId(userId);
    setAmountToAdd('100');
    addBalance(userId, 100);
  };

  const selectedUser = selectedUserId ? allUsers.find(u => u.id === selectedUserId) : null;

  return (
    <div className="space-y-6">
      {/* Add Balance Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#161b22] border border-[#21262d] rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-bold text-white">Add Balance to User</h3>
          
          {/* User Selection */}
          <div className="space-y-2">
            <label className="text-xs text-[#8b949e] uppercase font-bold">Search User</label>
            <input
              type="text"
              placeholder="Type name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#0d1117] border border-[#21262d] text-white rounded-lg focus:outline-none focus:border-[#2962ff] text-sm"
            />
          </div>

          {/* User Dropdown */}
          {filteredUsers.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs text-[#8b949e] uppercase font-bold">Select User</label>
              <select
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#0d1117] border border-[#21262d] text-white rounded-lg focus:outline-none focus:border-[#2962ff] text-sm cursor-pointer"
              >
                <option value="">-- Choose a user --</option>
                {filteredUsers.map(u => (
                  <option key={u.id} value={u.id}>
                    {u.name} - {u.email}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Selected User Info */}
          {selectedUser && (
            <div className="p-3 bg-[#26a69a]/20 border border-[#26a69a]/50 rounded-lg">
              <p className="text-xs text-[#8b949e] mb-1">Selected User:</p>
              <p className="text-white font-bold">{selectedUser.name}</p>
              <p className="text-xs text-[#8b949e] mt-2">Current Balance: <span className="text-[#26a69a] font-mono">${(selectedUser.balance || 0).toLocaleString()}</span></p>
            </div>
          )}

          {/* Amount Input */}
          <div className="space-y-2">
            <label className="text-xs text-[#8b949e] uppercase font-bold">Amount to Add ($)</label>
            <input
              type="number"
              min="0"
              step="1"
              value={amountToAdd}
              onChange={(e) => setAmountToAdd(e.target.value)}
              placeholder="e.g., 1000"
              className="w-full px-4 py-2.5 bg-[#0d1117] border border-[#21262d] text-white rounded-lg focus:outline-none focus:border-[#2962ff] text-sm"
            />
            {amountToAdd && (
              <p className="text-xs text-[#8b949e]">Total to add: <span className="text-[#26a69a] font-mono">${parseInt(amountToAdd).toLocaleString()}</span></p>
            )}
          </div>

          {/* Add Balance Button */}
          <button
            onClick={handleAddBalance}
            disabled={!selectedUserId || !amountToAdd}
            className="w-full py-3 bg-[#26a69a] hover:bg-teal-600 disabled:bg-[#21262d] disabled:text-[#8b949e] disabled:cursor-not-allowed text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="h-4 w-4" /> Add Balance
          </button>
        </div>

        {/* Statistics Panel */}
        <div className="space-y-4">
          <div className="bg-[#161b22] border border-[#21262d] rounded-lg p-6">
            <p className="text-xs text-[#8b949e] uppercase font-bold mb-2">Total Users</p>
            <p className="text-3xl font-bold text-white">{allUsers.length}</p>
          </div>
          <div className="bg-[#161b22] border border-[#21262d] rounded-lg p-6">
            <p className="text-xs text-[#8b949e] uppercase font-bold mb-2">Total Balance in System</p>
            <p className="text-3xl font-bold text-[#26a69a]">${allUsers.reduce((sum, u) => sum + (u.balance || 0), 0).toLocaleString()}</p>
          </div>
          <div className="bg-[#161b22] border border-[#21262d] rounded-lg p-6">
            <p className="text-xs text-[#8b949e] uppercase font-bold mb-2">Average Balance</p>
            <p className="text-3xl font-bold text-white">${(allUsers.reduce((sum, u) => sum + (u.balance || 0), 0) / (allUsers.length || 1)).toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* User List with Balance Actions */}
      <div className="bg-[#161b22] border border-[#21262d] rounded-lg p-6">
        <h3 className="text-lg font-bold text-white mb-4">All Users & Balances</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[800px]">
            <thead className="bg-[#0d1117] border-b border-[#21262d]">
              <tr>
                <th className="text-left py-3 px-4 text-[#8b949e] font-bold uppercase">Name</th>
                <th className="text-left py-3 px-4 text-[#8b949e] font-bold uppercase">Email</th>
                <th className="text-right py-3 px-4 text-[#8b949e] font-bold uppercase">Current Balance</th>
                <th className="text-center py-3 px-4 text-[#8b949e] font-bold uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#21262d]">
              {allUsers.map(user => (
                <tr key={user.id} className="hover:bg-[#1c2128] transition">
                  <td className="py-3 px-4 text-white font-medium">{user.name}</td>
                  <td className="py-3 px-4 text-[#8b949e] text-sm">{user.email}</td>
                  <td className="py-3 px-4 text-right">
                    <span className="font-mono font-bold text-[#26a69a]">${(user.balance || 0).toLocaleString()}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => handleQuickAdd(user.id)}
                        className="px-3 py-1 bg-[#26a69a]/20 text-[#26a69a] rounded text-xs font-bold hover:bg-[#26a69a]/30 transition"
                      >
                        +$100
                      </button>
                      <button
                        onClick={() => removeBalance(user.id, 100)}
                        className="px-3 py-1 bg-[#ef5350]/20 text-[#ef5350] rounded text-xs font-bold hover:bg-[#ef5350]/30 transition"
                      >
                        -$100
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
