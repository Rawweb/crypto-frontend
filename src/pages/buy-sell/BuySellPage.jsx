import React from 'react';
import BuySellHero from './BuySellHero';
import BuySellActions from './BuySellActions';
import BuySellTrust from './BuySellTrust';
import HowItWorksSection from '@pages/home/HowItWorksSection';

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
