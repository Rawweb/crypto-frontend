import { useEffect, useState } from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa6';

const CryptoMarquee = () => {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    let intervalId;

    const fetchPrices = async () => {
      try {
        const res = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,binancecoin,solana,ripple,cardano,dogecoin,polygon,tron,litecoin,polkadot,avalanche-2,chainlink,uniswap,stellar&price_change_percentage=24h'
        );
        const data = await res.json();
        setCoins(data);
      } catch (error) {
        console.error('Failed to fetch crypto prices', error);
      }
    };

    // initial fetch
    fetchPrices();

    // refresh every 60 seconds
    intervalId = setInterval(fetchPrices, 60000);

    // cleanup on unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="mt-16">
      <div className="bg-bg-surface/40 backdrop-blur-sm relative">
        {/* left fade */}
        <div className="absolute left-0 top-0 h-full w-32 bg-linear-to-r from-bg-main to-transparent pointer-events-none z-10" />

        {/* right fade */}
        <div className="absolute right-0 top-0 h-full w-32 bg-linear-to-l from-bg-main to-transparent pointer-events-none z-10" />

        <div className="overflow-hidden border-t border-b border-bg-elevated">
          <div className="relative w-full">
            <div className="flex gap-10 py-4 whitespace-nowrap animate-marquee">
              {[...coins, ...coins].map((coin, index) => {
                const isUp = coin.price_change_percentage_24h >= 0;

                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-sm min-w-max"
                  >
                    <span className="font-medium uppercase">{coin.symbol}</span>

                    <span className="text-text-primary">
                      ${coin.current_price.toLocaleString()}
                    </span>

                    <span
                      className={`flex items-center gap-1 ${
                        isUp ? 'text-status-success' : 'text-status-danger'
                      }`}
                    >
                      {isUp ? (
                        <FaArrowUp className="size-3" />
                      ) : (
                        <FaArrowDown className="size-3" />
                      )}
                      {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoMarquee;
