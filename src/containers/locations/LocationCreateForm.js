import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as locationActions from '../../store/locations/actions';
import LocationForm from './LocationForm';
import FormView from '../../components/FormView';
import * as globalActions from '../../store/global/actions';

export class LocationCreateForm extends Component {
  componentDidMount() {
    this.props.noTitle();
  }

  render() {
    const action = locationActions.createLocation;
    const initialData = {
      name: '',
      parent: '',
      location_type: '',
      geopoint: '',
      radius: '',
      shapefile: ''
    };
    return <FormView form={<LocationForm action={action} initialData={initialData} />} />;
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      noTitle: globalActions.toggleTitleOff
    },
    dispatch
  );
}

export default connect(
  null,
  mapDispatchToProps
)(LocationCreateForm);
