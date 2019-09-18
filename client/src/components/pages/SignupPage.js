import React from 'react';
import {
  Col,
  Grid,
  Row
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signup } from '../../actions/user';
import {Typography , Avatar, Container } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';

import SignupForm from '../forms/SignupForm';

class SignupPage extends React.Component {

  handleSubmit = data => this.props.signup(data).then(() => {
    this.props.history.push('/dashboard');
  });

  render() {
    return (
      <Grid>
        <Container maxWidth="sm">
        
          <Avatar className="avatar">
              <LockIcon/>
              </Avatar>
          <Typography component="h1" variant="h3">
              Signup
          </Typography>
            <SignupForm submit={this.handleSubmit} />
            </Container>
      </Grid>
    );
  }
}

SignupPage.propTypes = {
  signup: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default connect(null, { signup })(SignupPage);
