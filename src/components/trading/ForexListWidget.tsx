import { useEffect, useRef, useState } from "react";

export default function ForexListWidget() {
  const container = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<"forex" | "crypto" | "commodities">("forex");

  const forexMajors = [
    "FX:EURUSD", "FX:GBPUSD", "FX:USDJPY", "FX:AUDUSD", "FX:USDCAD",
    "FX:USDCHF", "FX:NZDUSD", "FX:EURGBP", "FX:EURJPY", "FX:GBPJPY",
    "FX:EURAUD", "FX:EURCAD", "FX:EURCHF", "FX:GBPAUD", "FX:GBPCAD",
    "FX:GBPCHF", "FX:AUDJPY", "FX:CADJPY", "FX:CHFJPY", "FX:NZDJPY"
  ];

  const forexAdditional = [
    "FX:AUDCAD", "FX:AUDCHF", "FX:AUDNZD", "FX:CADCHF", "FX:EURNZD",
    "FX:EURSGD", "FX:GBPNZD", "FX:NZDCAD", "FX:NZDCHF", "FX:SGDJPY",
    "FX:USDMXN", "FX:USDZAR", "FX:USDTRY", "FX:USDPLN", "FX:USDSEK",
    "FX:USDNOK", "FX:USDDKK", "FX:USDHKD", "FX:USDSGD", "FX:USDINR",
    "FX:USDKRW", "FX:USDTHB", "FX:USDMYR", "FX:USDIDR", "FX:USDPHP",
    "FX:USDVND", "FX:GBPTRY", "FX:EURTRY", "FX:EURPLN", "FX:EURSEK",
    "FX:EURNOK", "FX:EURDKK", "FX:EURHKD", "FX:EURSGD", "FX:EURINR",
    "FX:EURZAR"
  ];

  const cryptoSymbols = [
    "BINANCE:BTCUSDT", "BINANCE:ETHUSDT", "BINANCE:BNBUSDT", "BINANCE:SOLUSDT",
    "BINANCE:ADAUSDT", "BINANCE:XRPUSDT", "BINANCE:DOTUSD", "BINANCE:AVAXUSDT",
    "BINANCE:MATICUSDT", "BINANCE:LINKUSDT", "BINANCE:UNIUSDT", "BINANCE:LTCUSDT",
    "BINANCE:BCHUSD", "BINANCE:DOGEUSD", "BINANCE:XLMUSDT", "BINANCE:ETCUSDT",
    "BINANCE:VETUSDT", "BINANCE:IOTAUSDT", "BINANCE:FILUSDT", "BINANCE:CHZUSDT",
    "BINANCE:AXSUSDT", "BINANCE:AAVEUSDT", "BINANCE:SUSHIUSDT", "BINANCE:GMTUSDT",
    "BINANCE:INJUSDT", "BINANCE:ARBITUSDT", "BINANCE:OPUSDT", "BINANCE:WBTCUSDT",
    "BINANCE:STETHUSDT", "BINANCE:APEUSDT", "BINANCE:APTUSD", "BINANCE:NEARUSDT",
    "BINANCE:ATOMUSDT", "BINANCE:SUIUSDT", "BINANCE:PEPEUSDT", "BINANCE:BONKUSDT"
  ];

  const commoditySymbols = [
    "OANDA:XAUUSD", "OANDA:XAGUSD", "OANDA:XPTUSD", "OANDA:XPDUSD",
    "NYMEX:CL1!", "NYMEX:NG1!", "NYMEX:RB1!", "NYMEX:HO1!",
    "CBOT:ZC1!", "CBOT:ZS1!", "CBOT:ZW1!", "CBOT:KE1!",
    "CME:6E1!", "CME:6B1!", "CME:6J1!", "CME:6S1!",
    "COMEX:GC1!", "COMEX:SI1!", "COMEX:HG1!", "COMEX:ZO1!",
    "ICE:CB1!", "ICE:CT1!", "ICE:DF1!", "ICE:IF1!",
    "CBOT:ZL1!", "CBOT:ZM1!", "CBOT:GF1!", "CBOT:LE1!",
    "CBOT:LH1!", "CBOT:GE1!", "NYMEX:QG1!", "NYMEX:KC1!",
    "NYMEX:SB1!", "NYMEX:CT1!", "NYMEX:LB1!", "NYMEX:PA1!"
  ];

  const tabData = {
    forex: { label: "Forex", pairs: forexMajors, more: forexAdditional },
    crypto: { label: "Crypto", pairs: cryptoSymbols.slice(0, 20), more: cryptoSymbols.slice(20) },
    commodities: { label: "Commodities", pairs: commoditySymbols.slice(0, 20), more: commoditySymbols.slice(20) }
  };

  useEffect(() => {
    if (!container.current) return;

    container.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
    script.type = "text/javascript";
    script.async = true;

    const currentTab = tabData[activeTab];
    const allPairs = expanded ? currentTab.pairs.concat(currentTab.more) : currentTab.pairs;

    script.innerHTML = JSON.stringify({
      colorTheme: "dark",
      isTransparent: false,
      showSymbolLogo: true,
      locale: "en",
      width: "100%",
      height: 500,
      tabs: [
        {
          title: currentTab.label,
          symbols: allPairs.map((symbol) => ({ s: symbol }))
        }
      ]
    });

    if (container.current) {
      container.current.appendChild(script);
    }
  }, [expanded, activeTab]);

  return (
    <div className="w-full pb-20 md:pb-0">
      {/* Tab Selection */}
      <div className="flex gap-2 mb-4">
        {(["forex", "crypto", "commodities"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-xs font-bold rounded transition-colors ${
              activeTab === tab
                ? "bg-[#2962ff] text-white"
                : "bg-[#21262d] text-[#8b949e] hover:bg-[#30363d]"
            }`}
          >
            {tabData[tab].label}
          </button>
        ))}
      </div>

      {/* Widget Container */}
      <div className="tradingview-widget-container rounded-lg overflow-hidden" ref={container}>
        <div className="tradingview-widget-container__widget"></div>
      </div>

      {/* Expand/Collapse Button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-3 px-4 py-2 bg-[#2962ff] hover:bg-[#1f57d8] text-white text-xs font-bold rounded transition-colors w-full"
      >
        {expanded
          ? `Show Less (${(tabData[activeTab].pairs.length - 20).toString().padStart(2, "0")} hidden)`
          : `Show More Pairs (+${tabData[activeTab].more.length})`}
      </button>

      {/* Info */}
      <div className="mt-2 text-xs text-[#8b949e] text-center">
        Showing {expanded ? tabData[activeTab].pairs.length + tabData[activeTab].more.length : tabData[activeTab].pairs.length} {activeTab} pairs
      </div>
    </div>
  );
}
