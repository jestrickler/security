import React, { Component } from 'react';
import { Grid, Nav, Navbar, NavItem, Row } from 'react-bootstrap';
import { Redirect, Route, withRouter } from 'react-router-dom';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
import auth from './auth';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import TestPage from './components/TestPage';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    auth.loggedIn() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: "/login",
        state: { from: props.location }
      }}/>
    )
  )}/>
);

class App extends Component {

  logoutHandler = () => {
    auth.logOut();
    this.props.history.push("/");
  };

  render() {
    return (
      <Grid>
        <Row>
          <Navbar inverse collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/">Security</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <IndexLinkContainer to="/">
                  <NavItem eventKey={1}>Home</NavItem>
                </IndexLinkContainer>
                <LinkContainer to="/test">
                  <NavItem eventKey={2}>Test</NavItem>
                </LinkContainer>
             </Nav>
              <Nav pullRight>
                <NavItem eventKey={1} href="/" onClick={this.logoutHandler} >Log Out</NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Row>
        <Route exact path="/" component={HomePage}/>
        <Route path="/login" component={LoginPage}/>
        <PrivateRoute path="/test" component={TestPage}/>
      </Grid>
    );
  }
}

export default withRouter(App);

