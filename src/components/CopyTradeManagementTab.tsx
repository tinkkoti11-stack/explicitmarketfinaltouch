import React, { useState } from 'react';
import { Edit2, Trash2, Plus } from 'lucide-react';
import { CopyTradeTemplate } from '../lib/types';

interface CopyTradeManagementTabProps {
  copyTradeTemplates: CopyTradeTemplate[];
  addCopyTradeTemplate: (name: string, description: string, winRate: number, return_: number, followers: number, risk: 'Low' | 'Medium' | 'High', dailyReturn: number, trades: number) => void;
  editCopyTradeTemplate: (copyTradeId: string, updates: Partial<CopyTradeTemplate>) => void;
  deleteCopyTradeTemplate: (copyTradeId: string) => void;
}

export function CopyTradeManagementTab({
  copyTradeTemplates,
  addCopyTradeTemplate,
  editCopyTradeTemplate,
  deleteCopyTradeTemplate
}: CopyTradeManagementTabProps) {
  const [copyTradeForm, setCopyTradeForm] = useState({
    name: '',
    description: '',
    winRate: '',
    return: '',
    followers: '',
    risk: 'Medium' as 'Low' | 'Medium' | 'High',
    dailyReturn: '',
    trades: ''
  });

  const [editingCopyTradeId, setEditingCopyTradeId] = useState<string | null>(null);

  const updateFormField = (field: string, value: any) => {
    setCopyTradeForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddCopyTrade = (e: React.MouseEvent) => {
    e.preventDefault();
    if (copyTradeForm.name && copyTradeForm.winRate && copyTradeForm.return && copyTradeForm.followers && copyTradeForm.dailyReturn && copyTradeForm.trades) {
      if (editingCopyTradeId) {
        editCopyTradeTemplate(editingCopyTradeId, {
          name: copyTradeForm.name,
          description: copyTradeForm.description,
          winRate: parseFloat(copyTradeForm.winRate),
          return: parseFloat(copyTradeForm.return),
          followers: parseFloat(copyTradeForm.followers),
          risk: copyTradeForm.risk,
          dailyReturn: parseFloat(copyTradeForm.dailyReturn),
          trades: parseFloat(copyTradeForm.trades)
        });
        setEditingCopyTradeId(null);
      } else {
        addCopyTradeTemplate(
          copyTradeForm.name,
          copyTradeForm.description,
          parseFloat(copyTradeForm.winRate),
          parseFloat(copyTradeForm.return),
          parseFloat(copyTradeForm.followers),
          copyTradeForm.risk,
          parseFloat(copyTradeForm.dailyReturn),
          parseFloat(copyTradeForm.trades)
        );
      }
      resetCopyTradeForm();
    }
  };

  const resetCopyTradeForm = () => {
    setCopyTradeForm({
      name: '',
      description: '',
      winRate: '',
      return: '',
      followers: '',
      risk: 'Medium',
      dailyReturn: '',
      trades: ''
    });
    setEditingCopyTradeId(null);
  };

  const handleEditCopyTrade = (copyTrade: CopyTradeTemplate) => {
    setCopyTradeForm({
      name: copyTrade.name,
      description: copyTrade.description,
      winRate: copyTrade.winRate.toString(),
      return: copyTrade.return.toString(),
      followers: copyTrade.followers.toString(),
      risk: copyTrade.risk,
      dailyReturn: copyTrade.dailyReturn.toString(),
      trades: copyTrade.trades.toString()
    });
    setEditingCopyTradeId(copyTrade.id);
  };

  return (
    <div className="space-y-6">
      {/* Create Copy Trade Form */}
      <div className="bg-[#161b22] border border-[#21262d] rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-6">Create New Copy Trade Template</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-[#8b949e] uppercase mb-2 block">Trader Name</label>
            <input
              type="text"
              placeholder="John Smith"
              value={copyTradeForm.name}
              onChange={(e) => updateFormField('name', e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddCopyTrade(e as any)}
              className="w-full px-4 py-2 bg-[#0d1117] border border-[#21262d] text-white rounded-lg focus:outline-none focus:border-[#2962ff] transition-colors"
            />
          </div>

          <div>
            <label className="text-xs text-[#8b949e] uppercase mb-2 block">Win Rate (%)</label>
            <input
              type="number"
              placeholder="84"
              value={copyTradeForm.winRate}
              onChange={(e) => updateFormField('winRate', e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddCopyTrade(e as any)}
              className="w-full px-4 py-2 bg-[#0d1117] border border-[#21262d] text-white rounded-lg focus:outline-none focus:border-[#2962ff] transition-colors"
            />
          </div>

          <div>
            <label className="text-xs text-[#8b949e] uppercase mb-2 block">Total Return (%)</label>
            <input
              type="number"
              placeholder="124"
              step="0.1"
              value={copyTradeForm.return}
              onChange={(e) => updateFormField('return', e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddCopyTrade(e as any)}
              className="w-full px-4 py-2 bg-[#0d1117] border border-[#21262d] text-white rounded-lg focus:outline-none focus:border-[#2962ff] transition-colors"
            />
          </div>

          <div>
            <label className="text-xs text-[#8b949e] uppercase mb-2 block">Daily Return (%)</label>
            <input
              type="number"
              placeholder="9.2"
              step="0.1"
              value={copyTradeForm.dailyReturn}
              onChange={(e) => updateFormField('dailyReturn', e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddCopyTrade(e as any)}
              className="w-full px-4 py-2 bg-[#0d1117] border border-[#21262d] text-white rounded-lg focus:outline-none focus:border-[#2962ff] transition-colors"
            />
          </div>

          <div>
            <label className="text-xs text-[#8b949e] uppercase mb-2 block">Followers</label>
            <input
              type="number"
              placeholder="1205"
              value={copyTradeForm.followers}
              onChange={(e) => updateFormField('followers', e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddCopyTrade(e as any)}
              className="w-full px-4 py-2 bg-[#0d1117] border border-[#21262d] text-white rounded-lg focus:outline-none focus:border-[#2962ff] transition-colors"
            />
          </div>

          <div>
            <label className="text-xs text-[#8b949e] uppercase mb-2 block">Total Trades</label>
            <input
              type="number"
              placeholder="324"
              value={copyTradeForm.trades}
              onChange={(e) => updateFormField('trades', e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddCopyTrade(e as any)}
              className="w-full px-4 py-2 bg-[#0d1117] border border-[#21262d] text-white rounded-lg focus:outline-none focus:border-[#2962ff] transition-colors"
            />
          </div>

          <div>
            <label className="text-xs text-[#8b949e] uppercase mb-2 block">Risk Level</label>
            <select
              value={copyTradeForm.risk}
              onChange={(e) => updateFormField('risk', e.target.value)}
              className="w-full px-4 py-2 bg-[#0d1117] border border-[#21262d] text-white rounded-lg focus:outline-none focus:border-[#2962ff] transition-colors"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="text-xs text-[#8b949e] uppercase mb-2 block">Description</label>
            <textarea
              placeholder="Detailed description of the trading strategy, track record, and approach..."
              value={copyTradeForm.description}
              onChange={(e) => updateFormField('description', e.target.value)}
              className="w-full px-4 py-2 bg-[#0d1117] border border-[#21262d] text-white rounded-lg focus:outline-none focus:border-[#2962ff] transition-colors h-20"
            />
          </div>
        </div>

        <div className="flex gap-2 mt-6">
          <button
            onClick={handleAddCopyTrade}
            type="button"
            className="flex-1 py-2.5 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="h-4 w-4" />
            {editingCopyTradeId ? 'Update Copy Trade' : 'Create Copy Trade'}
          </button>
          {editingCopyTradeId && (
            <button
              onClick={resetCopyTradeForm}
              type="button"
              className="px-6 py-2.5 bg-[#ef5350]/20 text-[#ef5350] hover:bg-[#ef5350]/30 font-bold rounded-lg transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Copy Trade Templates List */}
      <div className="bg-[#161b22] border border-[#21262d] rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4">Copy Trade Templates ({copyTradeTemplates.length})</h3>
        
        {copyTradeTemplates.length > 0 ? (
          <div className="space-y-3">
            {copyTradeTemplates.map((copyTrade) => (
              <div key={copyTrade.id} className="bg-[#0d1117] border border-[#21262d] rounded-lg p-4 hover:border-yellow-500 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-lg font-bold text-white">{copyTrade.name}</h4>
                      <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs font-bold">VERIFIED</span>
                    </div>
                    <p className="text-sm text-[#8b949e] mt-1">{copyTrade.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                      <div>
                        <span className="text-xs text-[#8b949e] flex items-center gap-1">
                          Win Rate
                        </span>
                        <p className="text-white font-bold">{copyTrade.winRate}%</p>
                      </div>
                      <div>
                        <span className="text-xs text-[#8b949e] flex items-center gap-1">
                          Return
                        </span>
                        <p className="text-[#26a69a] font-bold">+{copyTrade.return}%</p>
                      </div>
                      <div>
                        <span className="text-xs text-[#8b949e]">Daily Return</span>
                        <p className="text-[#2962ff] font-bold">{copyTrade.dailyReturn}%</p>
                      </div>
                      <div>
                        <span className="text-xs text-[#8b949e]">Total Trades</span>
                        <p className="text-white font-bold">{copyTrade.trades}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 mt-2 text-sm">
                      <div>
                        <span className="text-[#8b949e]">Risk: </span>
                        <span className={copyTrade.risk === 'Low' ? 'text-green-500 font-bold' : copyTrade.risk === 'Medium' ? 'text-yellow-500 font-bold' : 'text-red-500 font-bold'}>
                          {copyTrade.risk}
                        </span>
                      </div>
                      <div>
                        <span className="text-[#8b949e]">Followers: </span>
                        <span className="text-white font-bold">{copyTrade.followers.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditCopyTrade(copyTrade)}
                      className="p-2 bg-[#2962ff]/20 text-[#2962ff] hover:bg-[#2962ff]/30 rounded-lg transition-colors"
                      title="Edit copy trade"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this copy trade template?')) {
                          deleteCopyTradeTemplate(copyTrade.id);
                        }
                      }}
                      className="p-2 bg-[#ef5350]/20 text-[#ef5350] hover:bg-[#ef5350]/30 rounded-lg transition-colors"
                      title="Delete copy trade"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 border border-dashed border-[#21262d] rounded-lg">
            <p className="text-[#8b949e]">No copy trade templates created yet. Create one above to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
}
