import React from 'react';
import BuySellHero from '@pages/Publics/Buy-sell/BuySellHero';
import BuySellActions from '@pages/Publics/Buy-sell/BuySellActions';
import BuySellTrust from '@pages/Publics/Buy-sell/BuySellTrust';
import HowItWorksSection from '@pages/Publics/Home/HowItWorksSection';


const BuySellPage = () => {
  return (
    <>
      <BuySellHero />
      <BuySellActions />
      <HowItWorksSection variant="buySell" />
      <BuySellTrust />
    </>
  );
};

export default BuySellPage;
