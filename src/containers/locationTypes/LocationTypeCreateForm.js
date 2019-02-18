import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as locationTypeActions from '../../store/locationTypes/actions';
import LocationTypeForm from './LocationTypeForm';
import FormView from '../../components/FormView';
import * as globalActions from '../../store/global/actions';

export class LocationTypeCreateForm extends Component {
  componentDidMount() {
    this.props.noTitle();
  }

  render() {
    const action = locationTypeActions.createLocationType;
    const initialData = {
      name: ''
    };
    return <FormView form={<LocationTypeForm action={action} initialData={initialData} />} />;
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
)(LocationTypeCreateForm);
