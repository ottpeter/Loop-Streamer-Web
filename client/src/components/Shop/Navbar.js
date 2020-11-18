import React from 'react'
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';


export default function Navbar() {
  return (
    <div className="shopNav navbar navbar-expand-sm px-sm">
      <Link to="/">LoopStreamer</Link>
      <ul className="navbar-nav align-items-right">
        <li className="nav-item ml-5">
          <Link to="/about"><FormattedMessage id="about" defaultMessage="About" /></Link>
        </li>
        <li className="nav-item ml-5">
          <Link to="/board/login"><FormattedMessage id="login" defaultMessage="Login" /></Link>
        </li>
      </ul>
    </div>
  )
}

