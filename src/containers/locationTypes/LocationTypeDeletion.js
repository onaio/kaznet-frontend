import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

import * as locationTypeActions from '../../store/locationTypes/actions';

export class LocationTypeDeletion extends Component {
  componentDidMount() {
    this.props.deleteLocationType(this.props.match.params.id);
  }

  render() {
    return <Redirect to="/locationTypes" />;
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      deleteLocationType: locationTypeActions.deleteLocationType
    },
    dispatch
  );
}

export default connect(
  null,
  mapDispatchToProps
)(LocationTypeDeletion);
