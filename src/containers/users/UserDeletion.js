import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

import * as userActions from '../../store/users/actions';

export class UserDeletion extends Component {
  componentDidMount() {
    this.props.deleteUser(this.props.match.params.id);
  }

  render() {
    return <Redirect to="/users" />;
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      deleteUser: userActions.deleteUser
    },
    dispatch
  );
}

export default connect(
  null,
  mapDispatchToProps
)(UserDeletion);
