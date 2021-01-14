import React from 'react';
import { FormattedMessage } from 'react-intl';

export default function Footer() {
  return (
    <div className="boardFooter">
      <FormattedMessage id="shop_footer" defaultMessage="This is the Landing page." />
    </div>
  )
}
