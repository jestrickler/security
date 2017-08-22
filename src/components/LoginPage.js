import React, { Component } from 'react';
import {Jumbotron, Row, Col, Form, FormGroup, FormControl, Button} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import Auth from '../auth';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: {username: '', password: ''},
      redirectToReferrer: false
    }
  }

  changeHandler = (event) => {
    let {credentials} = this.state;
    credentials[event.target.name] = event.target.value;
    this.setState({credentials});
  };

  submitHandler = (event) => {
    event.preventDefault();
    Auth.logIn(this.state.credentials)
      .then(() => {this.setState({ redirectToReferrer: true })});
  };

  render() {
    let {credentials, redirectToReferrer} = this.state;
    const { from } = this.props.location.state || { from: { pathname: '/' } }

    if (redirectToReferrer) {
      return (
        <Redirect to={from}/>
      )
    }

    return (
      <Row>
        <Jumbotron>
          <h1>Login</h1>
        </Jumbotron>
        <Row>
          <Col sm={4} smOffset={4}>
            <Form onSubmit={this.submitHandler}>
              <FormGroup>
                <FormControl type='text' name='username' placeholder='Username'
                             value={credentials.username}
                             onChange={this.changeHandler}/>
                <FormControl type='password' name='password' placeholder='Password'
                             value={credentials.password}
                             onChange={this.changeHandler}/>
              </FormGroup>
              <FormGroup>
                <Button bsStyle="success" type="submit">Login</Button>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Row>
    );
  }
}

export default LoginPage;


