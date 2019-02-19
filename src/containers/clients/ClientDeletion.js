import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

import * as clientActions from '../../store/clients/actions';

export class ClientDeletion extends Component {
  componentDidMount() {
    this.props.deleteClient(this.props.match.params.id);
  }

  render() {
    return <Redirect to="/clients" />;
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      deleteClient: clientActions.deleteClient
    },
    dispatch
  );
}

export default connect(
  null,
  mapDispatchToProps
)(ClientDeletion);
