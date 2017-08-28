import React from 'react';
import {Nav, Navbar, NavItem, Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {IndexLinkContainer, LinkContainer} from 'react-router-bootstrap';
import "../css/Header.css";

const Header = ({isAuthenticated, logout, user}) => {

  const authDetails = isAuthenticated ?
    (
      <Navbar.Text pullRight>
        Welcome, <strong className="Header-username">{user.username}</strong>
        <Navbar.Link className="Header-link" href="/" onClick={logout}>Sign Out</Navbar.Link>
      </Navbar.Text>
    ) : (
      <Navbar.Text pullRight>
        <Navbar.Link className="Header-link" href="/login" >Sign In</Navbar.Link>
      </Navbar.Text>
    );

  return (
    <Row>
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Security</Link>
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
          {authDetails}
       </Navbar.Collapse>
      </Navbar>
    </Row>
  );
}

Header.propTypes = {
  logout: React.PropTypes.func.isRequired,
};

export default Header;

