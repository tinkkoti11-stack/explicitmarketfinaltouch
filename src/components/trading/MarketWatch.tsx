import React, { useEffect, useRef } from 'react';

  export function MarketWatch({ onSelectAsset, selectedAsset }: { onSelectAsset: (s: string) => void, selectedAsset: string }) {
    const container = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!container.current) return;
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = JSON.stringify({
        "width": "100%",
        "height": "100%",
        "symbolsGroups": [
          {
            "name": "Forex",
            "originalName": "Forex",
            "symbols": [
              { "name": "FX:EURUSD" }, { "name": "FX:GBPUSD" }, { "s": "FX:USDJPY" }, { "s": "FX:USDCHF" }, { "s": "FX:AUDUSD" },
              { "s": "FX:USDCAD" }, { "s": "FX:NZDUSD" }, { "s": "FX:EURGBP" }, { "s": "FX:EURJPY" }, { "s": "FX:GBPJPY" },
              { "s": "FX:AUDJPY" }, { "s": "FX:EURAUD" }, { "s": "FX:AUDCAD" }, { "s": "FX:AUDCHF" }, { "s": "FX:CADJPY" }
            ]
          },
          {
            "name": "Indices",
            "symbols": [
              { "s": "FOREXCOM:SPX500" }, { "s": "FOREXCOM:NSXUSD" }, { "s": "FOREXCOM:DJI" }, { "s": "INDEX:NKY" }, { "s": "INDEX:DEU40" }, { "s": "INDEX:UK100" },
              { "s": "INDEX:HSI" }, { "s": "INDEX:CAC40" }, { "s": "INDEX:DAX" }
            ]
          },
          {
            "name": "Crypto",
            "symbols": [
              { "s": "BINANCE:BTCUSDT" }, { "s": "BINANCE:ETHUSDT" }, { "s": "BINANCE:BNBUSDT" }, { "s": "BINANCE:SOLUSDT" }, { "s": "BINANCE:ADAUSDT" }, { "s": "BINANCE:XRPUSDT" },
              { "s": "BINANCE:DOTUSDT" }, { "s": "BINANCE:DOGEUSDT" }, { "s": "BINANCE:AVAXUSDT" }
            ]
          }
        ],
        "showSymbolLogo": true,
        "colorTheme": "dark",
        "isTransparent": false,
        "locale": "en"
      });
      container.current.appendChild(script);
      return () => { if (container.current) container.current.innerHTML = ''; };
    }, []);

    return (
      <div className="h-full flex flex-col bg-[#161b22] border-r border-[#21262d]">
        <div className="py-3 px-4 border-b border-[#21262d]">
          <span className="text-xs font-bold text-[#8b949e] uppercase tracking-wider">Market Watch (Live)</span>
        </div>
        <div className="flex-1 overflow-hidden" ref={container}></div>
      </div>
    );
  }
  