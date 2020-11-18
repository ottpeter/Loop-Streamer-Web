import React from 'react'
import Navbar from './Navbar';
import Footer from './Footer';
import BuyButton from './BuyButton';
import { FormattedMessage } from 'react-intl';

// This is the landing page. 3 buttons will show with the 3 different buying options.
export default function Shop() {
  return (
    <div className="shopMain">
      <Navbar />
      <p>
      <FormattedMessage id="landing_main" defaultMessage="This is the Landing page." />
      </p>

      <FormattedMessage 
        id="welcome"
        defaultMessage="Welcome!"
      />
      <BuyButton label="buy_small" text="Buy Small" />
      <BuyButton label="buy_medium" text="Buy Medium" />
      <BuyButton label="buy_large" text="Buy Large" />
      <Footer />
    </div>
  )
}
