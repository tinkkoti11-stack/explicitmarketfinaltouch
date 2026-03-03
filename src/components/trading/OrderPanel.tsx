import React, { useEffect, useState } from 'react';
import { useStore } from '../../lib/store';
import { TradeType } from '../../lib/types';
import { ChevronDown } from 'lucide-react';

interface OrderPanelProps {
  symbol: string;
  onSymbolChange?: (symbol: string) => void;
}

export function OrderPanel({ symbol, onSymbolChange }: OrderPanelProps) {
  const { executeTrade, assets, account } = useStore();
  const [lots, setLots] = useState(0.1);
  const [sl, setSl] = useState('');
  const [tp, setTp] = useState('');
  const [showSymbolDropdown, setShowSymbolDropdown] = useState(false);
  const [buyPrice, setBuyPrice] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  
  const asset = assets.find((a) => a.symbol === symbol);

  // Reset inputs when symbol changes
  useEffect(() => {
    setSl('');
    setTp('');
    setBuyPrice('');
    setSellPrice('');
  }, [symbol]);

  if (!asset) return null;

  const handleSymbolChange = (newSymbol: string) => {
    setShowSymbolDropdown(false);
    if (onSymbolChange) {
      onSymbolChange(newSymbol);
    }
  };

  // Use custom prices if provided, otherwise use asset prices
  const displayBuyPrice = buyPrice ? parseFloat(buyPrice) : asset.ask;
  const displaySellPrice = sellPrice ? parseFloat(sellPrice) : asset.bid;

  const handleTrade = (type: TradeType) => {
    executeTrade(
      symbol,
      type,
      lots,
      sl ? parseFloat(sl) : undefined,
      tp ? parseFloat(tp) : undefined,
      type === 'BUY' ? displayBuyPrice : displaySellPrice
    );
  };

  const marginRequired = displayBuyPrice * lots * 100000 / account.leverage;

  // Helper to calculate price from pips
  const calculatePipPrice = (pips: number, type: 'SL' | 'TP') => {
    let pipSize = 0.0001;
    if (asset.digits === 3) pipSize = 0.01;
    if (asset.digits === 2) pipSize = 0.1;

    const basePrice = asset.bid;
    const change = pips * pipSize;

    if (type === 'SL') {
      const price = basePrice - change;
      setSl(price.toFixed(asset.digits));
    } else {
      const price = basePrice + change;
      setTp(price.toFixed(asset.digits));
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#161b22] md:border-l border-[#21262d] p-4 overflow-y-auto pb-20 md:pb-4">
      {/* Symbol Selector */}
      <div className="mb-6 relative">
        <button
          onClick={() => setShowSymbolDropdown(!showSymbolDropdown)}
          className="w-full px-4 py-3 bg-[#0d1117] border border-[#21262d] rounded flex items-center justify-between hover:border-[#2962ff] transition-colors"
        >
          <span className="text-lg font-bold text-white">{symbol}</span>
          <ChevronDown size={18} className={`text-[#8b949e] transition-transform ${showSymbolDropdown ? 'rotate-180' : ''}`} />
        </button>

        {showSymbolDropdown && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-[#161b22] border border-[#21262d] rounded max-h-60 overflow-y-auto z-10">
            {assets.slice(0, 50).map((a) => (
              <button
                key={a.symbol}
                onClick={() => handleSymbolChange(a.symbol)}
                className={`w-full text-left px-4 py-2 hover:bg-[#21262d] transition-colors font-mono text-sm ${
                  a.symbol === symbol ? 'bg-[#2962ff] text-white' : 'text-[#c9d1d9]'
                }`}
              >
                {a.symbol}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mb-6 text-center">
        <span className="text-xs text-[#8b949e] uppercase">
          Spread: {(asset.spread / Math.pow(10, asset.digits - 1)).toFixed(1)}
        </span>
      </div>

      {/* Price Display with Manual Adjustment */}
      <div className="mb-6 grid grid-cols-2 gap-2">
        <div className="bg-[#0d1117] p-3 rounded border border-[#21262d]">
          <label className="block text-xs text-[#ef5350] font-bold mb-1.5">SELL</label>
          <input
            type="number"
            value={sellPrice || asset.bid.toFixed(asset.digits)}
            onChange={(e) => setSellPrice(e.target.value)}
            step={Math.pow(10, -asset.digits).toFixed(asset.digits)}
            className="w-full text-lg font-mono text-white font-bold bg-transparent text-center focus:outline-none border-b border-[#21262d] pb-1"
          />
          <div className="text-xs text-[#8b949e] mt-1">Market: {asset.bid.toFixed(asset.digits)}</div>
        </div>
        <div className="bg-[#0d1117] p-3 rounded border border-[#21262d]">
          <label className="block text-xs text-[#26a69a] font-bold mb-1.5">BUY</label>
          <input
            type="number"
            value={buyPrice || asset.ask.toFixed(asset.digits)}
            onChange={(e) => setBuyPrice(e.target.value)}
            step={Math.pow(10, -asset.digits).toFixed(asset.digits)}
            className="w-full text-lg font-mono text-white font-bold bg-transparent text-center focus:outline-none border-b border-[#21262d] pb-1"
          />
          <div className="text-xs text-[#8b949e] mt-1">Market: {asset.ask.toFixed(asset.digits)}</div>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-xs text-[#8b949e] mb-1.5">Volume</label>
          <div className="flex items-center gap-1">
            <button
              onClick={() =>
              setLots(Math.max(0.01, parseFloat((lots - 0.01).toFixed(2))))
              }
              className="h-10 px-3 bg-[#21262d] text-white hover:bg-[#30363d] rounded-l flex items-center justify-center md:h-9 md:w-10">

              -
            </button>
            <input
              type="number"
              value={lots}
              onChange={(e) => setLots(parseFloat(e.target.value))}
              className="flex-1 h-10 bg-[#0d1117] border-y border-[#21262d] text-center text-white font-mono text-sm focus:outline-none md:h-9"
              step="0.01" />

            <button
              onClick={() => setLots(parseFloat((lots + 0.01).toFixed(2)))}
              className="h-10 px-3 bg-[#21262d] text-white hover:bg-[#30363d] rounded-r flex items-center justify-center md:h-9 md:w-10">

              +
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-[#8b949e] mb-1.5">
              Stop Loss
            </label>
            <input
              type="number"
              value={sl}
              onChange={(e) => setSl(e.target.value)}
              placeholder="0.0000"
              className="w-full h-10 bg-[#0d1117] border border-[#21262d] rounded px-3 text-white font-mono text-sm focus:border-[#2962ff] focus:outline-none md:h-9" />

            <div className="flex gap-1 mt-1.5">
              {[10, 20, 50].map((pips) =>
              <button
                key={pips}
                onClick={() => calculatePipPrice(pips, 'SL')}
                className="flex-1 py-2 text-xs bg-[#21262d] text-[#8b949e] hover:text-white hover:bg-[#30363d] rounded min-h-[40px] md:py-1 md:text-[10px] md:min-h-auto">

                  -{pips}p
                </button>
              )}
            </div>
          </div>
          <div>
            <label className="block text-xs text-[#8b949e] mb-1.5">
              Take Profit
            </label>
            <input
              type="number"
              value={tp}
              onChange={(e) => setTp(e.target.value)}
              placeholder="0.0000"
              className="w-full h-10 bg-[#0d1117] border border-[#21262d] rounded px-3 text-white font-mono text-sm focus:border-[#2962ff] focus:outline-none md:h-9" />

            <div className="flex gap-1 mt-1.5">
              {[10, 20, 50].map((pips) =>
              <button
                key={pips}
                onClick={() => calculatePipPrice(pips, 'TP')}
                className="flex-1 py-2 text-xs bg-[#21262d] text-[#8b949e] hover:text-white hover:bg-[#30363d] rounded min-h-[40px] md:py-1 md:text-[10px] md:min-h-auto">

                  +{pips}p
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Margin Required - Visible before buttons */}
      <div className="mb-4 p-3 bg-[#0d1117] rounded border border-[#21262d]">
        <p className="text-xs text-[#8b949e] text-center mb-1">Margin Required</p>
        <p className="text-lg font-mono font-bold text-white text-center">
          ${marginRequired.toFixed(2)}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <button
          onClick={() => handleTrade('SELL')}
          className="h-14 bg-[#ef5350] hover:bg-red-600 text-white rounded flex flex-col items-center justify-center transition-colors md:h-12">

          <span className="text-xs font-bold">SELL</span>
          <span className="text-sm font-mono font-bold">
            {displaySellPrice.toFixed(asset.digits)}
          </span>
        </button>
        <button
          onClick={() => handleTrade('BUY')}
          className="h-14 bg-[#26a69a] hover:bg-teal-600 text-white rounded flex flex-col items-center justify-center transition-colors md:h-12">

          <span className="text-xs font-bold">BUY</span>
          <span className="text-sm font-mono font-bold">
            {displayBuyPrice.toFixed(asset.digits)}
          </span>
        </button>
      </div>
    </div>);

}