import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader';
import { Container, Avatar, Typography, TextField, FormControlLabel, Button, Grid, Link,Checkbox, CssBaseline } from '@material-ui/core';
import {
  Alert,
  Col,
  ControlLabel,
  Form,
  FormControl,
  FormGroup
} from 'react-bootstrap';
import CustomButton from '../buttons/CustomButton';

class SignupForm extends React.Component {

  state = {
    data: {
      nickname: '',
      email: '',
      password: ''
    },
    loaded: true
  };

  onSubmit = e => {
    e.preventDefault();
    this.setState({ loaded: false });
    this.props.submit(this.state.data).catch(() => this.setState({ loaded: true, errors: true }));
    console.log("hey",this.state.data)
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
              <strong>Warning</strong> - Some error ocurred. Please try again.
            </Alert>
          </Col>
        }
        <Form horizontal onSubmit={this.onSubmit}>
        <Container component = "main" maxWidth="sm">
                    
                    
                    
                    <TextField inputstyle = {{ fontSize : '40px'}}
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          type='nickname'
                          id="nickname"
                          label="User Name"
                          name="nickname"
                          autoComplete="nickname"
                          autoFocus
                          defaultValue={data.nickname}
                          onChange={this.onChange}
                        />
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
                          defaultValue={data.password}
                          onChange={this.onChange}
                        />
                        <CustomButton
                        type='submit'
                        text='Sign Up'
                        />
                      
                      </Container>
          {/* <FormGroup >
            <Col componentClass={ControlLabel} sm={2}>
              Nickname
            </Col>
            <Col sm={12}>
              <FormControl
                type='nickname'
                name='nickname'
                defaultValue={data.nickname}
                onChange={this.onChange}
              />
            </Col>
          </FormGroup>
          <FormGroup >
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

SignupForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default SignupForm;
