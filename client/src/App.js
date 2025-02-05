import React from 'react';
import { connect } from 'react-redux';
import Shop from './components/Shop';
import About from './components/Shop/About';
import Details from './components/Shop/Details';
import Checkout from './components/Shop/Checkout';
import Done from './components/Shop/Done';
import Register from './components/Shop/Register';
//import Test from './components/Test';
import MainBoard from './components/Board';
import Account from './components/Board/Account';
import Settings from './components/Board/Settings';
import Login from './components/Board/Login';
import Default from './components/Default';
import { init } from './actions/shopActions';
import Verify from './components/Shop/Verify';
import { IntlProvider, FormattedMessage, FormattedNumber } from 'react-intl';       // Localization
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { isAuth } from './actions/boardActions';
import CheckEmail from './components/Shop/CheckEmail';


toast.configure();

// Hungarian 
const hunLabels = require('./languages/Hungarian.json');

class App extends React.Component {

  // Init
  componentDidMount() {
    this.props.dispatch(init());
    console.log("Now isAuth() is running in App.js (componentDidMount())");
    this.props.dispatch(isAuth());
  }

  render() {
    return (
      <div className="App">
        {/**This provides localization */}
        <IntlProvider messages={hunLabels} locale="hu" defaultLocale="en">

          {/** If user is logged in, redirect to Board */}
          <BrowserRouter>
            <Switch>

              {/** TODO need to check whether the user has active service or not. If not, offer to buy. */}
              <Route exact path="/" render={props => this.props.isLoggedIn ? (
                    <Redirect to="/board/" />
                  ) : (
                    <Shop />
                  )
                }
              />

              {/** About page for the shop */}
              <Route exact path="/about" component={About} />

              {/** Detailed view of specific product (small/medium/large) */}
              <Route exact path="/details" render={() => <Details />} />
              
              {/** Check your e-mail page */}
              <Route exact path="/emailsent" render={() => <CheckEmail />} />

              {/** Payment options */}
              <Route exact path="/checkout" render={props => this.props.isLoggedIn ?(
                  <Checkout />
                ) : (
                  <Redirect to="/" />
                )
              } 
              />

              {/** Verify user (Activation link) */}
              <Route path="/verify/:hash" render={() => <Verify />} />

              {/** Notification about payment */}
              <Route exact path="/done" render={() => <Done />} />

              {/** User Data */}
              <Route exact path="/register" component={Register} />

              {/** Test 
               * it doesn't exists anymore
              <Route exact path="/test" component={Test} />
              */}

              {/** Managment Board Main */}
              <Route exact path="/board" render={props => this.props.isLoggedIn ? (
                <MainBoard />
                ) : (
                  <Redirect to="/board/login" />
                  )
                }
                />

              {/** Managment Board Account Settings */}
              <Route exact path="/board/account" render={props => this.props.isLoggedIn ? (
                <Account />
                ) : (
                  <Redirect to="/board/login" />
                  )
                }
                />

              {/** Managment Board Settings */}
              <Route exact path="/board/settings" render={props => this.props.isLoggedIn ? (
                <Settings />
                ) : (
                  <Redirect to="/board/login" />
                  )
                }
                />

              {/** Managment Board Login */}
              <Route exact path="/board/login" render={props => this.props.isLoggedIn ? (
                <Redirect to="/board" />
                ) : (
                  <Login />
                  )
                }
                />

              {/** 404 */}
              <Route component={Default} />
            </Switch>
          </BrowserRouter>
          
        </IntlProvider>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.board.isLoggedIn,
});

export default connect(mapStateToProps)(App);