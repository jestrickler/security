import React, {Component} from 'react';
import {Jumbotron, Row} from 'react-bootstrap';

class HomePage extends Component {

  render() {
    return (
      <Row>
        <Jumbotron>
          <h1>Home</h1>
        </Jumbotron>
      </Row>
    );
  }
}

export default HomePage;
