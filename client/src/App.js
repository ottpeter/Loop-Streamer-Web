import React from 'react';
import { connect } from 'react-redux';
import Shop from './components/Shop/Shop'
import './App.css';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        {/** If user is logged in, redirect to Board */}
        <Router>
          <Route 
            exact
            path="/"
            render={props => this.props.isLoggedIn ? (
                <Redirect to="/board/" />
              ) : (
                <Shop />
              )
            }
          />
  
            
  
  
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.isLoggedIn
});

export default connect(mapStateToProps)(App);