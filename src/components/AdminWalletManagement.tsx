import { useState } from 'react';
import { useStore } from '../lib/store';
import {
  Plus,
  Edit2,
  Trash2,
  Copy,
  CheckCircle,
  X,
  Lock,
  Unlock,
  Bitcoin,
  Landmark,
} from 'lucide-react';

export function AdminWalletManagement() {
  const {
    systemWallets,
    addSystemWallet,
    editSystemWallet,
    removeSystemWallet,
    toggleSystemWalletStatus,
    bankAccounts,
    addBankAccount,
    editBankAccount,
    removeBankAccount,
    toggleBankAccountStatus,
  } = useStore();

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'crypto' | 'bank'>('crypto');
  
  // Crypto Form Data
  const [formData, setFormData] = useState({
    name: '',
    cryptoId: 'USDT-TRC20',
    network: 'TRC20',
    address: '',
    minDeposit: 10,
  });

  // Bank Form Data
  const [bankFormData, setBankFormData] = useState({
    accountName: '',
    accountNumber: '',
    bankName: '',
    routingNumber: '',
    accountType: 'CHECKING' as 'CHECKING' | 'SAVINGS',
    currency: 'USD',
    country: '',
    type: 'DEPOSIT' as 'DEPOSIT' | 'WITHDRAWAL',
    swiftCode: '',
    iban: '',
  });

  const [showAddBankForm, setShowAddBankForm] = useState(false);
  const [editingBankId, setEditingBankId] = useState<string | null>(null);

  const cryptoTemplates = [
    {
      id: 'BTC',
      name: 'Bitcoin',
      network: 'Bitcoin',
      icon: '₿',
      minDeposit: 0.001,
    },
    {
      id: 'ETH',
      name: 'Ethereum',
      network: 'ERC-20',
      icon: 'Ξ',
      minDeposit: 0.01,
    },
    {
      id: 'USDT-TRC20',
      name: 'Tether (TRC20)',
      network: 'TRC20',
      icon: '₮',
      minDeposit: 10,
    },
    {
      id: 'USDT-ERC20',
      name: 'Tether (ERC20)',
      network: 'ERC-20',
      icon: '₮',
      minDeposit: 10,
    },
    {
      id: 'LTC',
      name: 'Litecoin',
      network: 'Litecoin',
      icon: 'Ł',
      minDeposit: 0.1,
    },
    {
      id: 'XRP',
      name: 'Ripple',
      network: 'XRP Ledger',
      icon: '✕',
      minDeposit: 20,
    },
  ];

  const handleAddWallet = () => {
    if (!formData.address || !formData.name || !formData.cryptoId) {
      alert('Please fill in all required fields');
      return;
    }

    addSystemWallet(
      formData.name,
      formData.cryptoId,
      formData.network,
      formData.address,
      formData.minDeposit
    );

    setFormData({
      name: '',
      cryptoId: 'USDT-TRC20',
      network: 'TRC20',
      address: '',
      minDeposit: 10,
    });
    setShowAddForm(false);
  };

  const handleEditWallet = (wallet: any) => {
    setEditingId(wallet.id);
    setFormData({
      name: wallet.name,
      cryptoId: wallet.cryptoId,
      network: wallet.network,
      address: wallet.address,
      minDeposit: wallet.minDeposit,
    });
  };

  const handleSaveEdit = (walletId: string) => {
    if (!formData.address || !formData.name) {
      alert('Please fill in all required fields');
      return;
    }

    editSystemWallet(walletId, {
      name: formData.name,
      cryptoId: formData.cryptoId,
      network: formData.network,
      address: formData.address,
      minDeposit: formData.minDeposit,
    });

    setEditingId(null);
    setFormData({
      name: '',
      cryptoId: 'USDT-TRC20',
      network: 'TRC20',
      address: '',
      minDeposit: 10,
    });
  };

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopied(address);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleCryptorSelect = (template: any) => {
    setFormData({
      ...formData,
      cryptoId: template.id,
      network: template.network,
      name: template.name,
      minDeposit: template.minDeposit,
    });
  };

  // Bank Account Handlers
  const handleAddBankAccount = () => {
    if (!bankFormData.accountName || !bankFormData.bankName || !bankFormData.accountNumber) {
      alert('Please fill in all required fields');
      return;
    }

    addBankAccount(
      bankFormData.accountName,
      bankFormData.accountNumber,
      bankFormData.bankName,
      bankFormData.routingNumber,
      bankFormData.accountType,
      bankFormData.currency,
      bankFormData.country,
      bankFormData.type,
      bankFormData.swiftCode,
      bankFormData.iban
    );

    setBankFormData({
      accountName: '',
      accountNumber: '',
      bankName: '',
      routingNumber: '',
      accountType: 'CHECKING',
      currency: 'USD',
      country: '',
      type: 'DEPOSIT',
      swiftCode: '',
      iban: '',
    });
    setShowAddBankForm(false);
  };

  const handleEditBankAccount = (account: any) => {
    setEditingBankId(account.id);
    setBankFormData({
      accountName: account.accountName,
      accountNumber: account.accountNumber,
      bankName: account.bankName,
      routingNumber: account.routingNumber,
      accountType: account.accountType,
      currency: account.currency,
      country: account.country,
      type: account.type,
      swiftCode: account.swiftCode || '',
      iban: account.iban || '',
    });
  };

  const handleSaveEditBank = (accountId: string) => {
    if (!bankFormData.accountName || !bankFormData.bankName || !bankFormData.accountNumber) {
      alert('Please fill in all required fields');
      return;
    }

    editBankAccount(accountId, {
      accountName: bankFormData.accountName,
      accountNumber: bankFormData.accountNumber,
      bankName: bankFormData.bankName,
      routingNumber: bankFormData.routingNumber,
      accountType: bankFormData.accountType,
      currency: bankFormData.currency,
      country: bankFormData.country,
      type: bankFormData.type,
      swiftCode: bankFormData.swiftCode,
      iban: bankFormData.iban,
    });

    setEditingBankId(null);
    setBankFormData({
      accountName: '',
      accountNumber: '',
      bankName: '',
      routingNumber: '',
      accountType: 'CHECKING',
      currency: 'USD',
      country: '',
      type: 'DEPOSIT',
      swiftCode: '',
      iban: '',
    });
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex gap-2 border-b border-[#21262d]">
        <button
          onClick={() => setActiveTab('crypto')}
          className={`px-4 py-3 font-bold text-sm border-b-2 transition-all ${
            activeTab === 'crypto'
              ? 'border-[#26a69a] text-[#26a69a]'
              : 'border-transparent text-[#8b949e] hover:text-white'
          }`}
        >
          <Bitcoin className="h-4 w-4 inline mr-2" />
          Cryptocurrency Wallets
        </button>
        <button
          onClick={() => setActiveTab('bank')}
          className={`px-4 py-3 font-bold text-sm border-b-2 transition-all ${
            activeTab === 'bank'
              ? 'border-[#26a69a] text-[#26a69a]'
              : 'border-transparent text-[#8b949e] hover:text-white'
          }`}
        >
          <Landmark className="h-4 w-4 inline mr-2" />
          Bank Accounts
        </button>
      </div>

      {/* Crypto Wallets Tab */}
      {activeTab === 'crypto' && (
        <div className="space-y-6">
      {/* Header and Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Bitcoin className="h-5 w-5 text-yellow-500" />
            Deposit Wallet Management
          </h3>
          <p className="text-xs text-[#8b949e] mt-1">
            Manage cryptocurrency deposit addresses shown to users
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 bg-[#26a69a] hover:bg-teal-600 text-white rounded-lg text-sm font-bold flex items-center gap-2 transition-colors"
        >
          <Plus className="h-4 w-4" /> Add Wallet
        </button>
      </div>

      {/* Add/Edit Form */}
      {(showAddForm || editingId) && (
        <div className="bg-[#161b22] border border-[#21262d] rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest">
              {editingId ? 'Edit Wallet' : 'Add New Wallet'}
            </h4>
            <button
              onClick={() => {
                setShowAddForm(false);
                setEditingId(null);
                setFormData({
                  name: '',
                  cryptoId: 'USDT-TRC20',
                  network: 'TRC20',
                  address: '',
                  minDeposit: 10,
                });
              }}
              className="text-[#8b949e] hover:text-white transition"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Crypto Selection */}
          <div className="space-y-2">
            <label className="text-xs text-[#8b949e] uppercase font-bold">
              Select Cryptocurrency
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {cryptoTemplates.map((crypto) => (
                <button
                  key={crypto.id}
                  onClick={() => handleCryptorSelect(crypto)}
                  className={`p-3 border-2 rounded-lg flex flex-col items-center gap-1 transition-all text-sm ${
                    formData.cryptoId === crypto.id
                      ? 'border-[#26a69a] bg-[#26a69a]/10 text-white'
                      : 'border-[#21262d] bg-[#0d1117] text-[#8b949e] hover:border-[#8b949e]'
                  }`}
                >
                  <span className="text-lg">{crypto.icon}</span>
                  <span className="font-bold text-[10px]">{crypto.id}</span>
                  <span className="text-[9px] opacity-70">{crypto.network}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Wallet Name */}
          <div>
            <label className="text-xs text-[#8b949e] uppercase font-bold mb-2 block">
              Wallet Name / Label
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Main USDT Wallet"
              className="w-full px-4 py-2.5 bg-[#0d1117] border border-[#21262d] text-white rounded-lg focus:outline-none focus:border-[#26a69a]"
            />
          </div>

          {/* Wallet Address */}
          <div>
            <label className="text-xs text-[#8b949e] uppercase font-bold mb-2 block">
              Wallet Address
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Enter the deposit address..."
              className="w-full px-4 py-2.5 bg-[#0d1117] border border-[#21262d] text-white rounded-lg focus:outline-none focus:border-[#26a69a] font-mono text-sm"
            />
            <p className="text-xs text-[#8b949e] mt-1">
              {formData.network && `Network: ${formData.network}`}
            </p>
          </div>

          {/* Minimum Deposit */}
          <div>
            <label className="text-xs text-[#8b949e] uppercase font-bold mb-2 block">
              Minimum Deposit Amount
            </label>
            <input
              type="number"
              value={formData.minDeposit}
              onChange={(e) => setFormData({ ...formData, minDeposit: parseFloat(e.target.value) })}
              placeholder="10"
              step="0.001"
              className="w-full px-4 py-2.5 bg-[#0d1117] border border-[#21262d] text-white rounded-lg focus:outline-none focus:border-[#26a69a]"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            {editingId ? (
              <>
                <button
                  onClick={() => handleSaveEdit(editingId)}
                  className="flex-1 py-2.5 bg-[#26a69a] hover:bg-teal-600 text-white font-bold rounded-lg transition-colors"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => {
                    setEditingId(null);
                    setFormData({
                      name: '',
                      cryptoId: 'USDT-TRC20',
                      network: 'TRC20',
                      address: '',
                      minDeposit: 10,
                    });
                  }}
                  className="flex-1 py-2.5 bg-[#0d1117] hover:bg-[#161b22] border border-[#21262d] text-white font-bold rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleAddWallet}
                  className="flex-1 py-2.5 bg-[#26a69a] hover:bg-teal-600 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="h-4 w-4" /> Add Wallet
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 py-2.5 bg-[#0d1117] hover:bg-[#161b22] border border-[#21262d] text-white font-bold rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Wallets List */}
      <div className="space-y-3">
        {systemWallets.length > 0 ? (
          systemWallets.map((wallet) => (
            <div
              key={wallet.id}
              className={`border rounded-lg p-4 transition-all ${
                wallet.isActive
                  ? 'bg-[#161b22] border-[#21262d] hover:border-[#26a69a]/50'
                  : 'bg-[#0d1117] border-[#21262d]/50 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">
                      {
                        cryptoTemplates.find((c) => c.id === wallet.cryptoId)
                          ?.icon
                      }
                    </span>
                    <h5 className="text-white font-bold">{wallet.name}</h5>
                    <span className="text-xs text-[#8b949e] bg-[#0d1117] px-2 py-1 rounded">
                      {wallet.cryptoId}
                    </span>
                    {wallet.isActive ? (
                      <span className="text-xs bg-[#26a69a]/20 text-[#26a69a] px-2 py-1 rounded flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" /> Active
                      </span>
                    ) : (
                      <span className="text-xs bg-[#ef5350]/20 text-[#ef5350] px-2 py-1 rounded flex items-center gap-1">
                        <Lock className="h-3 w-3" /> Inactive
                      </span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs text-[#8b949e]">Network: {wallet.network}</p>
                    <p className="text-xs text-[#8b949e]">Min Deposit: {wallet.minDeposit}</p>
                    <div className="flex items-center gap-2 bg-[#0d1117] p-2 rounded border border-[#21262d] mt-2">
                      <code className="flex-1 text-[#26a69a] font-mono text-[11px] break-all">
                        {wallet.address}
                      </code>
                      <button
                        onClick={() => handleCopyAddress(wallet.address)}
                        className="flex-shrink-0 p-1.5 hover:bg-[#21262d] rounded transition"
                      >
                        {copied === wallet.address ? (
                          <CheckCircle className="h-4 w-4 text-[#26a69a]" />
                        ) : (
                          <Copy className="h-4 w-4 text-[#8b949e]" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => toggleSystemWalletStatus(wallet.id)}
                    className={`px-3 py-2 rounded text-xs font-bold transition-colors flex items-center gap-1 ${
                      wallet.isActive
                        ? 'bg-[#ef5350]/20 text-[#ef5350] hover:bg-[#ef5350]/30'
                        : 'bg-[#26a69a]/20 text-[#26a69a] hover:bg-[#26a69a]/30'
                    }`}
                  >
                    {wallet.isActive ? (
                      <>
                        <Lock className="h-3 w-3" /> Deactivate
                      </>
                    ) : (
                      <>
                        <Unlock className="h-3 w-3" /> Activate
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => handleEditWallet(wallet)}
                    className="px-3 py-2 bg-[#2962ff]/20 text-[#2962ff] rounded text-xs font-bold hover:bg-[#2962ff]/30 transition-colors flex items-center gap-1"
                  >
                    <Edit2 className="h-3 w-3" /> Edit
                  </button>
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          'Are you sure you want to delete this wallet?'
                        )
                      ) {
                        removeSystemWallet(wallet.id);
                      }
                    }}
                    className="px-3 py-2 bg-[#ef5350]/20 text-[#ef5350] rounded text-xs font-bold hover:bg-[#ef5350]/30 transition-colors flex items-center gap-1"
                  >
                    <Trash2 className="h-3 w-3" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-[#161b22] border border-[#21262d] rounded-lg">
            <Bitcoin className="h-8 w-8 text-[#8b949e] mx-auto mb-2 opacity-50" />
            <p className="text-[#8b949e]">No wallets configured yet</p>
            <p className="text-[11px] text-[#8b949e] mt-1">
              Add your first deposit wallet to get started
            </p>
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="bg-[#161b22] border border-[#21262d] rounded-lg p-4 space-y-2">
        <h5 className="text-sm font-bold text-white">ℹ️ Admin Information</h5>
        <ul className="text-xs text-[#8b949e] space-y-1">
          <li>• Active wallets are displayed to users in the deposit section</li>
          <li>• Deactivate wallets to hide them from users without deleting</li>
          <li>• Users can only deposit to active wallets</li>
          <li>• Verify all wallet addresses before making them active</li>
          <li>• You can manage multiple wallets for different cryptocurrencies</li>
        </ul>
      </div>
        </div>
      )}

      {/* Bank Accounts Tab */}
      {activeTab === 'bank' && (
        <div className="space-y-6">
          {/* Header and Add Button */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Landmark className="h-5 w-5 text-blue-500" />
                Bank Account Management
              </h3>
              <p className="text-xs text-[#8b949e] mt-1">
                Manage bank accounts for user deposits and withdrawals
              </p>
            </div>
            <button
              onClick={() => setShowAddBankForm(!showAddBankForm)}
              className="px-4 py-2 bg-[#26a69a] hover:bg-teal-600 text-white rounded-lg text-sm font-bold flex items-center gap-2 transition-colors"
            >
              <Plus className="h-4 w-4" /> Add Bank Account
            </button>
          </div>

          {/* Add/Edit Bank Form */}
          {(showAddBankForm || editingBankId) && (
            <div className="bg-[#161b22] border border-[#21262d] rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold text-white uppercase tracking-widest">
                  {editingBankId ? 'Edit Bank Account' : 'Add New Bank Account'}
                </h4>
                <button
                  onClick={() => {
                    setShowAddBankForm(false);
                    setEditingBankId(null);
                    setBankFormData({
                      accountName: '',
                      accountNumber: '',
                      bankName: '',
                      routingNumber: '',
                      accountType: 'CHECKING',
                      currency: 'USD',
                      country: '',
                      type: 'DEPOSIT',
                      swiftCode: '',
                      iban: '',
                    });
                  }}
                  className="text-[#8b949e] hover:text-white transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Account Name */}
                <div>
                  <label className="text-xs text-[#8b949e] uppercase font-bold mb-2 block">
                    Account Name *
                  </label>
                  <input
                    type="text"
                    value={bankFormData.accountName}
                    onChange={(e) => setBankFormData({ ...bankFormData, accountName: e.target.value })}
                    placeholder="e.g., Main Business Account"
                    className="w-full px-4 py-2.5 bg-[#0d1117] border border-[#21262d] text-white rounded-lg focus:outline-none focus:border-[#26a69a]"
                  />
                </div>

                {/* Bank Name */}
                <div>
                  <label className="text-xs text-[#8b949e] uppercase font-bold mb-2 block">
                    Bank Name *
                  </label>
                  <input
                    type="text"
                    value={bankFormData.bankName}
                    onChange={(e) => setBankFormData({ ...bankFormData, bankName: e.target.value })}
                    placeholder="e.g., Chase Bank"
                    className="w-full px-4 py-2.5 bg-[#0d1117] border border-[#21262d] text-white rounded-lg focus:outline-none focus:border-[#26a69a]"
                  />
                </div>

                {/* Account Number */}
                <div>
                  <label className="text-xs text-[#8b949e] uppercase font-bold mb-2 block">
                    Account Number *
                  </label>
                  <input
                    type="text"
                    value={bankFormData.accountNumber}
                    onChange={(e) => setBankFormData({ ...bankFormData, accountNumber: e.target.value })}
                    placeholder="e.g., 123456789"
                    className="w-full px-4 py-2.5 bg-[#0d1117] border border-[#21262d] text-white rounded-lg focus:outline-none focus:border-[#26a69a]"
                  />
                </div>

                {/* Routing Number */}
                <div>
                  <label className="text-xs text-[#8b949e] uppercase font-bold mb-2 block">
                    Routing Number
                  </label>
                  <input
                    type="text"
                    value={bankFormData.routingNumber}
                    onChange={(e) => setBankFormData({ ...bankFormData, routingNumber: e.target.value })}
                    placeholder="e.g., 021000021"
                    className="w-full px-4 py-2.5 bg-[#0d1117] border border-[#21262d] text-white rounded-lg focus:outline-none focus:border-[#26a69a]"
                  />
                </div>

                {/* Account Type */}
                <div>
                  <label className="text-xs text-[#8b949e] uppercase font-bold mb-2 block">
                    Account Type
                  </label>
                  <select
                    value={bankFormData.accountType}
                    onChange={(e) => setBankFormData({ ...bankFormData, accountType: e.target.value as 'CHECKING' | 'SAVINGS' })}
                    className="w-full px-4 py-2.5 bg-[#0d1117] border border-[#21262d] text-white rounded-lg focus:outline-none focus:border-[#26a69a]"
                  >
                    <option value="CHECKING">Checking</option>
                    <option value="SAVINGS">Savings</option>
                  </select>
                </div>

                {/* Transaction Type */}
                <div>
                  <label className="text-xs text-[#8b949e] uppercase font-bold mb-2 block">
                    Transaction Type
                  </label>
                  <select
                    value={bankFormData.type}
                    onChange={(e) => setBankFormData({ ...bankFormData, type: e.target.value as 'DEPOSIT' | 'WITHDRAWAL' })}
                    className="w-full px-4 py-2.5 bg-[#0d1117] border border-[#21262d] text-white rounded-lg focus:outline-none focus:border-[#26a69a]"
                  >
                    <option value="DEPOSIT">Deposit</option>
                    <option value="WITHDRAWAL">Withdrawal</option>
                  </select>
                </div>

                {/* Country */}
                <div>
                  <label className="text-xs text-[#8b949e] uppercase font-bold mb-2 block">
                    Country
                  </label>
                  <input
                    type="text"
                    value={bankFormData.country}
                    onChange={(e) => setBankFormData({ ...bankFormData, country: e.target.value })}
                    placeholder="e.g., United States"
                    className="w-full px-4 py-2.5 bg-[#0d1117] border border-[#21262d] text-white rounded-lg focus:outline-none focus:border-[#26a69a]"
                  />
                </div>

                {/* Currency */}
                <div>
                  <label className="text-xs text-[#8b949e] uppercase font-bold mb-2 block">
                    Currency
                  </label>
                  <input
                    type="text"
                    value={bankFormData.currency}
                    onChange={(e) => setBankFormData({ ...bankFormData, currency: e.target.value })}
                    placeholder="e.g., USD"
                    className="w-full px-4 py-2.5 bg-[#0d1117] border border-[#21262d] text-white rounded-lg focus:outline-none focus:border-[#26a69a]"
                  />
                </div>

                {/* IBAN */}
                <div>
                  <label className="text-xs text-[#8b949e] uppercase font-bold mb-2 block">
                    IBAN (Optional)
                  </label>
                  <input
                    type="text"
                    value={bankFormData.iban}
                    onChange={(e) => setBankFormData({ ...bankFormData, iban: e.target.value })}
                    placeholder="e.g., DE89370400440532013000"
                    className="w-full px-4 py-2.5 bg-[#0d1117] border border-[#21262d] text-white rounded-lg focus:outline-none focus:border-[#26a69a]"
                  />
                </div>

                {/* SWIFT Code */}
                <div>
                  <label className="text-xs text-[#8b949e] uppercase font-bold mb-2 block">
                    SWIFT Code (Optional)
                  </label>
                  <input
                    type="text"
                    value={bankFormData.swiftCode}
                    onChange={(e) => setBankFormData({ ...bankFormData, swiftCode: e.target.value })}
                    placeholder="e.g., CHASUSWW"
                    className="w-full px-4 py-2.5 bg-[#0d1117] border border-[#21262d] text-white rounded-lg focus:outline-none focus:border-[#26a69a]"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4">
                {editingBankId ? (
                  <>
                    <button
                      onClick={() => handleSaveEditBank(editingBankId)}
                      className="flex-1 py-2.5 bg-[#26a69a] hover:bg-teal-600 text-white font-bold rounded-lg transition-colors"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => {
                        setEditingBankId(null);
                        setBankFormData({
                          accountName: '',
                          accountNumber: '',
                          bankName: '',
                          routingNumber: '',
                          accountType: 'CHECKING',
                          currency: 'USD',
                          country: '',
                          type: 'DEPOSIT',
                          swiftCode: '',
                          iban: '',
                        });
                      }}
                      className="flex-1 py-2.5 bg-[#0d1117] hover:bg-[#161b22] border border-[#21262d] text-white font-bold rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleAddBankAccount}
                      className="flex-1 py-2.5 bg-[#26a69a] hover:bg-teal-600 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <Plus className="h-4 w-4" /> Add Account
                    </button>
                    <button
                      onClick={() => setShowAddBankForm(false)}
                      className="flex-1 py-2.5 bg-[#0d1117] hover:bg-[#161b22] border border-[#21262d] text-white font-bold rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Bank Accounts List */}
          <div className="space-y-3">
            {bankAccounts.length > 0 ? (
              bankAccounts.map((account) => (
                <div
                  key={account.id}
                  className={`border rounded-lg p-4 transition-all ${
                    account.isActive
                      ? 'bg-[#161b22] border-[#21262d] hover:border-[#26a69a]/50'
                      : 'bg-[#0d1117] border-[#21262d]/50 opacity-60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <Landmark className="h-4 w-4 text-blue-500" />
                        <h5 className="text-white font-bold">{account.accountName}</h5>
                        <span className="text-xs text-[#8b949e] bg-[#0d1117] px-2 py-1 rounded">
                          {account.accountType}
                        </span>
                        {account.isActive ? (
                          <span className="text-xs bg-[#26a69a]/20 text-[#26a69a] px-2 py-1 rounded flex items-center gap-1">
                            <CheckCircle className="h-3 w-3" /> Active
                          </span>
                        ) : (
                          <span className="text-xs bg-[#ef5350]/20 text-[#ef5350] px-2 py-1 rounded flex items-center gap-1">
                            <Lock className="h-3 w-3" /> Inactive
                          </span>
                        )}
                      </div>

                      <div className="space-y-1">
                        <p className="text-xs text-[#8b949e]">Bank: {account.bankName}</p>
                        <p className="text-xs text-[#8b949e]">Account: {account.accountNumber}</p>
                        <p className="text-xs text-[#8b949e]">Type: {account.type} • Country: {account.country}</p>
                        {account.iban && <p className="text-xs text-[#8b949e]">IBAN: {account.iban}</p>}
                        {account.swiftCode && <p className="text-xs text-[#8b949e]">SWIFT: {account.swiftCode}</p>}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => toggleBankAccountStatus(account.id)}
                        className={`px-3 py-2 rounded text-xs font-bold transition-colors flex items-center gap-1 ${
                          account.isActive
                            ? 'bg-[#ef5350]/20 text-[#ef5350] hover:bg-[#ef5350]/30'
                            : 'bg-[#26a69a]/20 text-[#26a69a] hover:bg-[#26a69a]/30'
                        }`}
                      >
                        {account.isActive ? (
                          <>
                            <Lock className="h-3 w-3" /> Deactivate
                          </>
                        ) : (
                          <>
                            <Unlock className="h-3 w-3" /> Activate
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => handleEditBankAccount(account)}
                        className="px-3 py-2 bg-[#2962ff]/20 text-[#2962ff] rounded text-xs font-bold hover:bg-[#2962ff]/30 transition-colors flex items-center gap-1"
                      >
                        <Edit2 className="h-3 w-3" /> Edit
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm('Are you sure you want to delete this bank account?')) {
                            removeBankAccount(account.id);
                          }
                        }}
                        className="px-3 py-2 bg-[#ef5350]/20 text-[#ef5350] rounded text-xs font-bold hover:bg-[#ef5350]/30 transition-colors flex items-center gap-1"
                      >
                        <Trash2 className="h-3 w-3" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-[#161b22] border border-[#21262d] rounded-lg">
                <Landmark className="h-8 w-8 text-[#8b949e] mx-auto mb-2 opacity-50" />
                <p className="text-[#8b949e]">No bank accounts configured yet</p>
                <p className="text-[11px] text-[#8b949e] mt-1">
                  Add your first bank account to enable bank transfers
                </p>
              </div>
            )}
          </div>

          {/* Info Box */}
          <div className="bg-[#161b22] border border-[#21262d] rounded-lg p-4 space-y-2">
            <h5 className="text-sm font-bold text-white">ℹ️ Admin Information</h5>
            <ul className="text-xs text-[#8b949e] space-y-1">
              <li>• Active bank accounts are displayed to users in the deposit section</li>
              <li>• Deactivate accounts to hide them from users without deleting (shows "not available")</li>
              <li>• Users can only deposit to active bank accounts</li>
              <li>• Store secure banking information for processing transfers</li>
              <li>• IBAN and SWIFT codes are optional but recommended for international transfers</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
