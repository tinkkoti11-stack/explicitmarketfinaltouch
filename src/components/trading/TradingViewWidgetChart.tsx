import { useEffect, useRef } from "react";

export default function TradingViewWidget() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;

    script.onload = () => {
      if (window.TradingView && container.current) {
        new (window as any).TradingView.widget({
          container_id: "tradingview_chart",
          symbol: "NASDAQ:AAPL",
          interval: "D",
          width: "100%",
          height: 500,
          theme: "dark",
        });
      }
    };

    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return <div id="tradingview_chart" ref={container} style={{ width: '100%', height: '500px' }}></div>;
}
