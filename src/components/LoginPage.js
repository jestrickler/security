import React, {Component} from "react";
import {Alert, Button, Col, Form, FormControl, FormGroup, Row, Well} from "react-bootstrap";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {login} from "../actions/auth";
import "../css/LoginPage.css";


class LoginPage extends Component {
  state = {credentials: {username: '', password: ''}};

  changeHandler = (event) => {
    let {credentials} = this.state;
    credentials[event.target.name] = event.target.value;
    this.setState({credentials});
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.login(this.state.credentials)
  };

  render() {
    let {credentials} = this.state;
    let {isAuthenticated, error} = this.props;
    const {from} = this.props.location.state || {from: {pathname: '/'}}

    if (isAuthenticated) {
      return (
        <Redirect to={from}/>
      )
    }

    return (
      <Row>
        <Col md={4} mdOffset={4}>
          <Well bsSize="large">
            {error && <Alert bsStyle="danger">{error}</Alert>}
            <h2 className="LoginPage-header">Please Sign In</h2>
            <Form onSubmit={this.submitHandler}>
              <FormGroup>
                <FormControl bsSize="large" type='text' name='username' placeholder='Username'
                             value={credentials.username} onChange={this.changeHandler}/>
                <FormControl bsSize="large" type='password' name='password' placeholder='Password'
                             value={credentials.password} onChange={this.changeHandler}/>
              </FormGroup>
              <FormGroup>
                <Button className="LoginPage-button" bsStyle="primary" bsSize="large" type="submit">Sign In</Button>
              </FormGroup>
            </Form>
          </Well>
        </Col>
      </Row>
    );
  }
}

LoginPage.propTypes = {
  login: React.PropTypes.func.isRequired,
  isAuthenticated: React.PropTypes.bool.isRequired,
  error: React.PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    error: state.auth.error
  }
};
export default connect(mapStateToProps, {login})(LoginPage);


