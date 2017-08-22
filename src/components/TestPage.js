import React, { Component } from 'react';
import { Jumbotron, Row } from 'react-bootstrap';

class TestPage extends Component {

  render() {
    return (
      <Row>
        <Jumbotron>
          <h1>Test</h1>
        </Jumbotron>
      </Row>
    );
  }
}

export default TestPage;
