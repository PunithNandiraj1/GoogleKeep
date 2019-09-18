import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader';
import { Container, Avatar, Typography, TextField, FormControlLabel, Button, Grid, Link,Checkbox, CssBaseline } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import {
  Alert,
  Col,
  ControlLabel,
  Form,
  FormControl,
  FormGroup
} from 'react-bootstrap';
import CustomButton from '../buttons/CustomButton';

class LoginForm extends React.Component {

  state = {
    data: {
      email: '',
      password: ''
    },
    loaded: true
  };

  onSubmit = e => {
    e.preventDefault();
    this.setState({ loaded: false });
    this.props.submit(this.state.data).catch(() => this.setState({ loaded: true, errors: true }));
  };

  onChange = e => {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });
  };

  render() {
    const { data, loaded, errors } = this.state;

    return (
      <Loader loaded={loaded}>
        {errors &&
          <Col>
            <Alert bsStyle='warning'>
              <strong>Warning</strong> - Invalid Email or Password
            </Alert>
          </Col>
        }
        <Form horizontal onSubmit={this.onSubmit}>
          <Container component = "main" maxWidth="s">
                    
                    
                    
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          type='email'
                          id="email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                          autoFocus
                          defaultValue={data.email}
                          onChange={this.onChange}
                        />
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                          autoComplete="current-password"
                        />
                        <CustomButton
                         type='submit'
                         text='Login'
          />
          
          </Container>
          {/* <FormGroup >
            <Col componentClass={ControlLabel} sm={2}>
              Email
            </Col>
            <Col sm={12}>
              <FormControl
                type='email'
                name='email'
                defaultValue={data.email}
                onChange={this.onChange}
              />
            </Col>
          </FormGroup>
          <FormGroup >
            <Col componentClass={ControlLabel} sm={2}>
              Password
            </Col>
            <Col sm={12}>
              <FormControl
                type='password'
                name='password'
                defaultValue={data.password}
                onChange={this.onChange}
              />
            </Col>
          </FormGroup> */}
          
        </Form>
      </Loader>
    );
  }
}

LoginForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default LoginForm;
