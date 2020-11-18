import React from 'react';
import { FormattedMessage } from 'react-intl';

// This is a BUY button, that will receive it's label as props
export default function BuyButton({label, text}) {
  return (
    <button className="buyButton">
      <FormattedMessage id={label} defaultMessage={text} />
    </button>
  )
}
