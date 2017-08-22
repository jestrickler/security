import React, { Component } from 'react';
import { Alert, Button, Col, Form, FormControl, FormGroup, Row, Well} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import Auth from '../auth';
import '../css/LoginPage.css';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: {username: '', password: ''},
      error: '',
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
      .then(() => {this.setState({ redirectToReferrer: true })})
      .catch((error) => { this.setState({error: error}) });
  };

  render() {
    let {credentials, error, redirectToReferrer} = this.state;
    const { from } = this.props.location.state || { from: { pathname: '/' } }

    if (redirectToReferrer) {
      return (
        <Redirect to={from}/>
      )
    }

    return (
      <Row>
        <Col md={4} mdOffset={4}>
          <Well bsSize="large">
            {error && <Alert bsStyle="danger">{error.message}</Alert>}
            <h2 className="LoginPage-header">Please login</h2>
            <Form onSubmit={this.submitHandler}>
              <FormGroup>
                <FormControl bsSize="large" type='text' name='username' placeholder='Username'
                             value={credentials.username} onChange={this.changeHandler}/>
                <FormControl bsSize="large" type='password' name='password' placeholder='Password'
                             value={credentials.password} onChange={this.changeHandler}/>
              </FormGroup>
              <FormGroup>
                <Button className="LoginPage-button" bsStyle="primary" bsSize="large" type="submit">Login</Button>
              </FormGroup>
            </Form>
          </Well>
        </Col>
      </Row>
    );
  }
}

export default LoginPage;


