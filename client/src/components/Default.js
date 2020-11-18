import React from 'react';
import { FormattedMessage } from 'react-intl';
import Navbar from './Shop/Navbar';
import Footer from './Shop/Footer';

export default function Default() {
  return (
    <div>
      <Navbar />
      <FormattedMessage id="404" defaultMessage="404 - Page not found." />
      <Footer />
    </div>
  )
}
