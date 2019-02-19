import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

import * as locationActions from '../../store/locations/actions';

export class LocationDeletion extends Component {
  componentDidMount() {
    this.props.deleteLocation(this.props.match.params.id);
  }

  render() {
    return <Redirect to="/locations" />;
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      deleteLocation: locationActions.deleteLocation
    },
    dispatch
  );
}

export default connect(
  null,
  mapDispatchToProps
)(LocationDeletion);
