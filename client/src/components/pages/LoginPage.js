import React from 'react';
import {
  Col,
  Grid,
  Row
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Typography , Avatar, Container } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';

import { login } from '../../actions/user';
import LoginForm from '../forms/LoginForm';

class LoginPage extends React.Component {

  handleSubmit = data => this.props.login(data).then(() => {
    this.props.history.push('/dashboard');
  });

  render() {
    return (
      <Grid>
        <Container maxWidth="sm">
          <Avatar className="avatar">
                         <LockIcon/>
                    </Avatar>
          <Typography component="h1" variant="h4">
                        Login
                    </Typography>
            <LoginForm submit={this.handleSubmit} />
        </Container>
      </Grid>
    );
  }
}

LoginPage.propTypes = {
  login: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default connect(null, { login })(LoginPage);
