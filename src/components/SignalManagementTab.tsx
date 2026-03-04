import { useState } from 'react';
import { Plus, Trash2, Edit2, Zap, Award, TrendingUp } from 'lucide-react';
import { SignalTemplate } from '../lib/types';

interface SignalManagementTabProps {
  signalTemplates: SignalTemplate[];
  addSignalTemplate: (providerName: string, description: string, symbol: string, confidence: number, followers: number, cost: number, winRate: number, trades: number, avgReturn: number) => void;
  editSignalTemplate: (signalId: string, updates: Partial<SignalTemplate>) => void;
  deleteSignalTemplate: (signalId: string) => void;
}

export function SignalManagementTabComponent({
  signalTemplates,
  addSignalTemplate,
  editSignalTemplate,
  deleteSignalTemplate
}: SignalManagementTabProps) {
  const [editingSignalId, setEditingSignalId] = useState<string | null>(null);
  const [signalForm, setSignalForm] = useState({
    providerName: '',
    description: '',
    symbol: '',
    confidence: '',
    followers: '',
    cost: '',
    winRate: '',
    trades: '',
    avgReturn: ''
  });

  const updateFormField = (field: string, value: any) => {
    setSignalForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddSignal = (e: React.MouseEvent) => {
    e.preventDefault();
    if (signalForm.providerName && signalForm.symbol && signalForm.confidence && signalForm.followers && signalForm.cost && signalForm.winRate && signalForm.trades && signalForm.avgReturn) {
      if (editingSignalId) {
        editSignalTemplate(editingSignalId, {
          providerName: signalForm.providerName,
          description: signalForm.description,
          symbol: signalForm.symbol,
          confidence: parseFloat(signalForm.confidence),
          followers: parseFloat(signalForm.followers),
          cost: parseFloat(signalForm.cost),
          winRate: parseFloat(signalForm.winRate),
          trades: parseFloat(signalForm.trades),
          avgReturn: parseFloat(signalForm.avgReturn)
        });
        setEditingSignalId(null);
      } else {
        addSignalTemplate(
          signalForm.providerName,
          signalForm.description,
          signalForm.symbol,
          parseFloat(signalForm.confidence),
          parseFloat(signalForm.followers),
          parseFloat(signalForm.cost),
          parseFloat(signalForm.winRate),
          parseFloat(signalForm.trades),
          parseFloat(signalForm.avgReturn)
        );
      }
      resetSignalForm();
    }
  };

  const resetSignalForm = () => {
    setSignalForm({
      providerName: '',
      description: '',
      symbol: '',
      confidence: '',
      followers: '',
      cost: '',
      winRate: '',
      trades: '',
      avgReturn: ''
    });
    setEditingSignalId(null);
  };

  const handleEditSignal = (signal: SignalTemplate) => {
    setSignalForm({
      providerName: signal.providerName,
      description: signal.description,
      symbol: signal.symbol,
      confidence: signal.confidence.toString(),
      followers: signal.followers.toString(),
      cost: signal.cost.toString(),
      winRate: signal.winRate.toString(),
      trades: signal.trades.toString(),
      avgReturn: signal.avgReturn.toString()
    });
    setEditingSignalId(signal.id);
  };

  return (
    <div className="space-y-6">
      {/* Create/Edit Signal Form */}
      <div className="bg-[#161b22] border border-[#21262d] rounded-lg p-6 space-y-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Zap className="h-5 w-5 text-yellow-500" />
          {editingSignalId ? 'Edit Signal Template' : 'Create New Signal Template'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-[#8b949e] uppercase mb-2 block">Provider Name</label>
            <input
              type="text"
              placeholder="e.g., FX Master Pro"
              value={signalForm.providerName}
              onChange={(e) => updateFormField('providerName', e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddSignal(e as any)}
              className="w-full px-4 py-2 bg-[#0d1117] border border-[#21262d] text-white rounded-lg focus:outline-none focus:border-[#2962ff] transition-colors"
            />
          </div>

          <div>
            <label className="text-xs text-[#8b949e] uppercase mb-2 block">Subscription Cost ($)</label>
            <input
              type="number"
              placeholder="59.99"
              step="0.01"
              value={signalForm.cost}
              onChange={(e) => updateFormField('cost', e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddSignal(e as any)}
              className="w-full px-4 py-2 bg-[#0d1117] border border-[#21262d] text-white rounded-lg focus:outline-none focus:border-[#2962ff] transition-colors"
            />
          </div>

          <div>
            <label className="text-xs text-[#8b949e] uppercase mb-2 block">Win Rate (%)</label>
            <input
              type="number"
              placeholder="78"
              value={signalForm.winRate}
              onChange={(e) => updateFormField('winRate', e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddSignal(e as any)}
              className="w-full px-4 py-2 bg-[#0d1117] border border-[#21262d] text-white rounded-lg focus:outline-none focus:border-[#2962ff] transition-colors"
            />
          </div>

          <div>
            <label className="text-xs text-[#8b949e] uppercase mb-2 block">Total Signals Provided</label>
            <input
              type="number"
              placeholder="342"
              value={signalForm.trades}
              onChange={(e) => updateFormField('trades', e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddSignal(e as any)}
              className="w-full px-4 py-2 bg-[#0d1117] border border-[#21262d] text-white rounded-lg focus:outline-none focus:border-[#2962ff] transition-colors"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-xs text-[#8b949e] uppercase mb-2 block">Average Return (%)</label>
            <input
              type="number"
              placeholder="24.5"
              step="0.1"
              value={signalForm.avgReturn}
              onChange={(e) => updateFormField('avgReturn', e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddSignal(e as any)}
              className="w-full px-4 py-2 bg-[#0d1117] border border-[#21262d] text-white rounded-lg focus:outline-none focus:border-[#2962ff] transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="text-xs text-[#8b949e] uppercase mb-2 block">Trading Pair / Symbol</label>
          <input
            type="text"
            placeholder="EURUSD"
            value={signalForm.symbol}
            onChange={(e) => updateFormField('symbol', e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddSignal(e as any)}
            className="w-full px-4 py-2 bg-[#0d1117] border border-[#21262d] text-white rounded-lg focus:outline-none focus:border-[#2962ff] transition-colors"
          />
        </div>

        <div>
          <label className="text-xs text-[#8b949e] uppercase mb-2 block">Confidence Level (0-100)</label>
          <input
            type="number"
            placeholder="85"
            min="0"
            max="100"
            value={signalForm.confidence}
            onChange={(e) => updateFormField('confidence', e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddSignal(e as any)}
            className="w-full px-4 py-2 bg-[#0d1117] border border-[#21262d] text-white rounded-lg focus:outline-none focus:border-[#2962ff] transition-colors"
          />
        </div>

        <div>
          <label className="text-xs text-[#8b949e] uppercase mb-2 block">Followers</label>
          <input
            type="number"
            placeholder="1250"
            value={signalForm.followers}
            onChange={(e) => updateFormField('followers', e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddSignal(e as any)}
            className="w-full px-4 py-2 bg-[#0d1117] border border-[#21262d] text-white rounded-lg focus:outline-none focus:border-[#2962ff] transition-colors"
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-xs text-[#8b949e] uppercase mb-2 block">Description</label>
          <textarea
            placeholder="Detailed description of the signal service, strategy, and track record..."
            value={signalForm.description}
            onChange={(e) => updateFormField('description', e.target.value)}
            className="w-full px-4 py-2 bg-[#0d1117] border border-[#21262d] text-white rounded-lg focus:outline-none focus:border-[#2962ff] transition-colors h-20"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleAddSignal}
            type="button"
            className="flex-1 py-2.5 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="h-4 w-4" />
            {editingSignalId ? 'Update Signal' : 'Create Signal'}
          </button>
          {editingSignalId && (
            <button
              onClick={resetSignalForm}
              type="button"
              className="px-6 py-2.5 bg-[#ef5350]/20 text-[#ef5350] hover:bg-[#ef5350]/30 font-bold rounded-lg transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Signal Templates List */}
      <div className="bg-[#161b22] border border-[#21262d] rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4">Signal Templates ({signalTemplates.length})</h3>
        
        {signalTemplates.length > 0 ? (
          <div className="space-y-3">
            {signalTemplates.map((signal) => (
              <div key={signal.id} className="bg-[#0d1117] border border-[#21262d] rounded-lg p-4 hover:border-yellow-500 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-lg font-bold text-white">{signal.providerName}</h4>
                      <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs font-bold">VERIFIED</span>
                    </div>
                    <p className="text-sm text-[#8b949e] mt-1">{signal.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-3">
                      <div>
                        <span className="text-xs text-[#8b949e] flex items-center gap-1">
                          📈 Pair
                        </span>
                        <p className="text-white font-bold">{signal.symbol}</p>
                      </div>
                      <div>
                        <span className="text-xs text-[#8b949e] flex items-center gap-1">
                          <Award className="h-3 w-3" /> Confidence
                        </span>
                        <p className="text-[#2962ff] font-bold">{signal.confidence}%</p>
                      </div>
                      <div>
                        <span className="text-xs text-[#8b949e] flex items-center gap-1">
                          👥 Followers
                        </span>
                        <p className="text-white font-bold">{signal.followers}</p>
                      </div>
                      <div>
                        <span className="text-xs text-[#8b949e] flex items-center gap-1">
                          <DollarSignIcon className="h-3 w-3" /> Cost
                        </span>
                        <p className="text-white font-bold">${signal.cost?.toFixed(2)}</p>
                      </div>
                      <div>
                        <span className="text-xs text-[#8b949e] flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" /> Avg Return
                        </span>
                        <p className="text-[#26a69a] font-bold">+{signal.avgReturn}%</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditSignal(signal)}
                      className="p-2 bg-[#2962ff]/20 text-[#2962ff] hover:bg-[#2962ff]/30 rounded-lg transition-colors"
                      title="Edit signal"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this signal template?')) {
                          deleteSignalTemplate(signal.id);
                        }
                      }}
                      className="p-2 bg-[#ef5350]/20 text-[#ef5350] hover:bg-[#ef5350]/30 rounded-lg transition-colors"
                      title="Delete signal"
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
            <Zap className="h-8 w-8 text-[#8b949e] mx-auto mb-2" />
            <p className="text-[#8b949e]">No signal templates created yet. Create one above to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper component for dollar sign icon since it's not in lucide-react directly
function DollarSignIcon({ className }: { className: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 1C6.48 1 2 5.48 2 11s4.48 10 10 10 10-4.48 10-10S17.52 1 12 1zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 7 15.5 7 14 7.67 14 8.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 7 8.5 7 7 7.67 7 8.5 7.67 10 8.5 10zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
    </svg>
  );
}
