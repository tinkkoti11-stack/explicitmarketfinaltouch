import { useState } from 'react';
import { useStore } from '../lib/store';
import {
  CreditCard,
  CheckCircle,
  XCircle,
  Clock,
  MessageSquare,
} from 'lucide-react';

export function AdminCreditCardDeposits() {
  const { creditCardDeposits, allUsers, approveCreditCardDeposit, rejectCreditCardDeposit } = useStore();
  const [selectedDepositId, setSelectedDepositId] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'PENDING' | 'APPROVED' | 'REJECTED'>('all');

  const filteredDeposits = creditCardDeposits.filter((deposit) => {
    if (filterStatus !== 'all' && deposit.status !== filterStatus) return false;
    return true;
  });

  const handleApprove = (depositId: string) => {
    approveCreditCardDeposit(depositId, notes);
    alert('✅ Credit card deposit approved!');
    setSelectedDepositId(null);
    setNotes('');
  };

  const handleReject = (depositId: string) => {
    rejectCreditCardDeposit(depositId, notes);
    alert('❌ Credit card deposit rejected!');
    setSelectedDepositId(null);
    setNotes('');
  };

  const getUserName = (userId: string) => {
    return allUsers.find((u) => u.id === userId)?.name || 'Unknown';
  };

  const getUserEmail = (userId: string) => {
    return allUsers.find((u) => u.id === userId)?.email || 'Unknown';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-blue-500" />
            Credit Card Deposits
          </h3>
          <p className="text-xs text-[#8b949e] mt-1">
            Manage and approve credit card deposit requests from users
          </p>
        </div>
        <div className="px-3 py-1 bg-[#0d1117] border border-[#21262d] rounded text-xs font-bold text-[#8b949e]">
          {creditCardDeposits.filter((d) => d.status === 'PENDING').length} Pending
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {['all', 'PENDING', 'APPROVED', 'REJECTED'].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status as any)}
            className={`px-3 py-1 text-xs font-bold rounded capitalize transition-all ${
              filterStatus === status
                ? 'bg-[#26a69a] text-white'
                : 'bg-[#161b22] text-[#8b949e] border border-[#21262d] hover:text-white'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Deposits Table */}
      <div className="bg-[#161b22] border border-[#21262d] rounded-lg overflow-hidden">
        {filteredDeposits.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[900px]">
              <thead className="bg-[#0d1117] text-[#8b949e] text-xs uppercase border-b border-[#21262d]">
                <tr>
                  <th className="px-6 py-4 text-left font-bold">User</th>
                  <th className="px-6 py-4 text-left font-bold">Card Info</th>
                  <th className="px-6 py-4 text-right font-bold">Amount</th>
                  <th className="px-6 py-4 text-left font-bold">Date</th>
                  <th className="px-6 py-4 text-center font-bold">Status</th>
                  <th className="px-6 py-4 text-center font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#21262d]">
                {filteredDeposits.map((deposit) => (
                  <tr key={deposit.id} className="hover:bg-[#1c2128] transition">
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <p className="text-white font-bold">{getUserName(deposit.userId)}</p>
                        <p className="text-[#8b949e] text-xs">{getUserEmail(deposit.userId)}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <p className="text-white font-mono text-sm">{deposit.cardNumber}</p>
                        <p className="text-[#8b949e] text-xs">{deposit.cardHolder}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className="text-white font-mono font-bold">${deposit.amount.toFixed(2)}</p>
                      <p className="text-[#8b949e] text-xs">+2.5% fee</p>
                    </td>
                    <td className="px-6 py-4 text-[#8b949e] text-sm">
                      {new Date(deposit.submittedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {deposit.status === 'PENDING' ? (
                        <span className="px-3 py-1 rounded text-xs font-bold inline-block bg-yellow-500/10 text-yellow-500 flex items-center gap-1 justify-center">
                          <Clock className="h-3 w-3" /> Pending
                        </span>
                      ) : deposit.status === 'APPROVED' ? (
                        <span className="px-3 py-1 rounded text-xs font-bold inline-block bg-[#26a69a]/10 text-[#26a69a] flex items-center gap-1 justify-center">
                          <CheckCircle className="h-3 w-3" /> Approved
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded text-xs font-bold inline-block bg-[#ef5350]/10 text-[#ef5350] flex items-center gap-1 justify-center">
                          <XCircle className="h-3 w-3" /> Rejected
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {deposit.status === 'PENDING' && (
                        <button
                          onClick={() => setSelectedDepositId(selectedDepositId === deposit.id ? null : deposit.id)}
                          className="px-3 py-1 bg-[#2962ff] hover:bg-[#1e47a0] text-white rounded text-xs font-bold transition-colors"
                        >
                          {selectedDepositId === deposit.id ? 'Close' : 'Review'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center">
            <CreditCard className="h-8 w-8 text-[#8b949e] mx-auto mb-2 opacity-50" />
            <p className="text-[#8b949e] text-sm">No credit card deposits found</p>
          </div>
        )}
      </div>

      {/* Detail Panel */}
      {selectedDepositId && (
        <div className="bg-[#161b22] border border-[#21262d] rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest">
              Review Deposit
            </h4>
          </div>

          {creditCardDeposits.find((d) => d.id === selectedDepositId) && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-[#8b949e] uppercase mb-1">User</p>
                  <p className="text-white font-bold">
                    {getUserName(creditCardDeposits.find((d) => d.id === selectedDepositId)?.userId || '')}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#8b949e] uppercase mb-1">Amount</p>
                  <p className="text-white font-bold">
                    ${creditCardDeposits.find((d) => d.id === selectedDepositId)?.amount.toFixed(2)}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-[#8b949e] uppercase mb-1">Card Number</p>
                  <p className="text-white font-mono text-sm">
                    {creditCardDeposits.find((d) => d.id === selectedDepositId)?.cardNumber}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#8b949e] uppercase mb-1">Card Holder</p>
                  <p className="text-white font-bold">
                    {creditCardDeposits.find((d) => d.id === selectedDepositId)?.cardHolder}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#8b949e] uppercase mb-1">Expiry Date</p>
                  <p className="text-white font-bold">
                    {creditCardDeposits.find((d) => d.id === selectedDepositId)?.expiryDate}
                  </p>
                </div>
              </div>

              {/* Notes Section */}
              <div>
                <label className="text-xs text-[#8b949e] uppercase font-bold mb-2 block">
                  Admin Notes
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add notes about this deposit..."
                  className="w-full px-4 py-3 bg-[#0d1117] border border-[#21262d] rounded text-white text-sm focus:outline-none focus:border-[#26a69a] resize-none"
                  rows={3}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4">
                <button
                  onClick={() => handleApprove(selectedDepositId)}
                  className="flex-1 py-2.5 bg-[#26a69a] hover:bg-teal-600 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircle className="h-4 w-4" /> Approve & Credit
                </button>
                <button
                  onClick={() => handleReject(selectedDepositId)}
                  className="flex-1 py-2.5 bg-[#ef5350] hover:bg-red-600 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <XCircle className="h-4 w-4" /> Reject
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Info Box */}
      <div className="bg-[#161b22] border border-[#21262d] rounded-lg p-4 space-y-2">
        <h5 className="text-sm font-bold text-white flex items-center gap-2">
          <MessageSquare className="h-4 w-4" /> Processing Information
        </h5>
        <ul className="text-xs text-[#8b949e] space-y-1">
          <li>• Review credit card details carefully before approving</li>
          <li>• Card numbers are masked after submission for security</li>
          <li>• Approved deposits will automatically credit the user's account</li>
          <li>• Rejected deposits should include notes explaining the reason</li>
          <li>• Processing fee (2.5%) is included in the deposit amount</li>
        </ul>
      </div>
    </div>
  );
}
