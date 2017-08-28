import React, {Component} from 'react';
import {Grid} from 'react-bootstrap';
import {Redirect, Route, withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import {logout} from "./actions/auth";
import Header from './components/Header';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import TestPage from './components/TestPage';

const SecuredRoute = ({component: Component, isAuthenticated, ...rest}) => (
  <Route {...rest} render={props => (
    isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: "/login",
        state: {from: props.location}
      }}/>
    )
  )}/>
);

class App extends Component {

  logoutHandler = () => {
    this.props.history.push("/");
    this.props.logout();
  };

  render() {
    let {isAuthenticated, user} = this.props;
    return (
      <Grid>
        <Header isAuthenticated={isAuthenticated} logout={this.logoutHandler} user={user}/>
        <Route exact path="/" component={HomePage}/>
        <Route path="/login" component={LoginPage}/>
        <SecuredRoute path="/test" component={TestPage} isAuthenticated={this.props.isAuthenticated}/>
      </Grid>
    );
  }
}

App.propTypes = {
  isAuthenticated: React.PropTypes.bool.isRequired,
  logout: React.PropTypes.func.isRequired,
  user: React.PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
  }
};

export default withRouter(connect(mapStateToProps, {logout})(App));

