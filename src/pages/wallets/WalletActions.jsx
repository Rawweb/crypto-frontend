
import { Link } from 'react-router-dom';

const WalletActions = () => {


  return (
    <div className="flex gap-4">
      <Link
        to="/wallet/deposit"

        className="flex-1 bg-brand-primary hover:bg-brand-hover text-black py-3 rounded-lg text-sm font-medium text-center "
      >
        Deposit
      </Link>

      <Link
        to="/wallet/withdraw"
        className="flex-1 border border-bg-elevated  hover:bg-bg-surface py-3 rounded-lg text-sm text-center"
      >
        Withdraw
      </Link>
    </div>
  );
};

export default WalletActions;
