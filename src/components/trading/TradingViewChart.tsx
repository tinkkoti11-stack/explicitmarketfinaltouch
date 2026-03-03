import React, { useEffect, useRef } from 'react';

export function TradingViewChart() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear any existing content
    containerRef.current.innerHTML = '';

    // Create the tradingview container
    const tradingViewContainer = document.createElement('div');
    tradingViewContainer.className = 'tradingview-widget-container';
    tradingViewContainer.style.height = '100%';
    tradingViewContainer.style.width = '100%';

    // Create the widget div
    const widgetDiv = document.createElement('div');
    widgetDiv.className = 'tradingview-widget-container__widget';
    widgetDiv.style.height = '100%';
    widgetDiv.style.width = '100%';

    tradingViewContainer.appendChild(widgetDiv);
    containerRef.current.appendChild(tradingViewContainer);

    // Create and add the script
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js';
    script.async = true;
    script.type = 'text/javascript';
    script.innerHTML = JSON.stringify({
      showChart: true,
      locale: 'en',
      width: '100%',
      height: '100%',
      largeChartUrl: '',
      plotLineColorGrowing: 'rgba(41, 98, 255, 1)',
      plotLineColorFalling: 'rgba(225, 88, 88, 1)',
      gridLineColor: 'rgba(42, 46, 57, 0.06)',
      scaleFontColor: 'rgba(134, 137, 147, 1)',
      belowLineFillColorGrowing: 'rgba(41, 98, 255, 0.12)',
      belowLineFillColorFalling: 'rgba(225, 88, 88, 0.12)',
      belowLineFillColorGrowingBottom: 'rgba(41, 98, 255, 0)',
      belowLineFillColorFallingBottom: 'rgba(225, 88, 88, 0)',
      symbolActiveColor: 'rgba(41, 98, 255, 0.12)',
      tabs: [
        {
          title: 'Forex',
          symbols: [
            { s: 'FX:EURUSD' },
            { s: 'FX:GBPUSD' },
            { s: 'FX:USDJPY' },
            { s: 'FX:USDCHF' },
            { s: 'FX:AUDUSD' },
            { s: 'FX:USDCAD' }
          ]
        },
        {
          title: 'Indices',
          symbols: [
            { s: 'FOREXCOM:SPX500' },
            { s: 'FOREXCOM:NSXUSD' },
            { s: 'FOREXCOM:DJI' },
            { s: 'INDEX:NKY' },
            { s: 'INDEX:DEU40' }
          ]
        },
        {
          title: 'Commodities',
          symbols: [
            { s: 'CME_MINI:ES1!' },
            { s: 'CME:6E1!' },
            { s: 'COMEX:GC1!' },
            { s: 'NYMEX:CL1!' },
            { s: 'NYMEX:NG1!' }
          ]
        },
        {
          title: 'Crypto',
          symbols: [
            { s: 'BINANCE:BTCUSDT' },
            { s: 'BINANCE:ETHUSDT' },
            { s: 'BINANCE:BNBUSDT' },
            { s: 'BINANCE:SOLUSDT' },
            { s: 'BINANCE:ADAUSDT' }
          ]
        }
      ],
      colorTheme: 'dark'
    });

    containerRef.current.appendChild(script);

    // Try to trigger widget load
    if (typeof (window as any).TradingView !== 'undefined') {
      (window as any).TradingView.widget.load();
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  return <div ref={containerRef} style={{ height: '100%', width: '100%' }} />;
}
