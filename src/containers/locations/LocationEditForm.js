import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import LocationForm from './LocationForm';
import FormView from '../../components/FormView';
import * as locationSelectors from '../../store/locations/reducer';
import * as locationActions from '../../store/locations/actions';
import * as errorHandlerSelectors from '../../store/errorHandler/reducer';
import * as globalActions from '../../store/global/actions';

export class LocationEditForm extends Component {
  componentDidMount() {
    this.props.fetchLocation(this.props.match.params.id);
    this.props.noTitle();
  }

  render() {
    this.location = this.props.currentLocation;
    if (!this.location || !this.location.id) {
      return this.renderLoading();
    }
    const action = locationActions.editLocation;
    const initialData = {
      name: this.location.attributes.name,
      description: this.location.attributes.description,
      parent: this.location.relationships.parent.data
        ? {
            value: this.location.relationships.parent.data.id,
            label: this.location.attributes.parent_name
          }
        : '',
      location_type: this.location.relationships.location_type.data
        ? {
            value: this.location.relationships.location_type.data.id,
            label: this.location.attributes.location_type_name
          }
        : '',
      geopoint:
        this.location.attributes.geopoint != null
          ? this.location.attributes.geopoint.coordinates
          : '',
      radius: this.location.attributes.radius != null ? this.location.attributes.radius : '',
      shapefile:
        this.location.attributes.shapefile != null ? [this.location.attributes.name, '.shp'] : ''
    };

    return (
      <FormView
        form={
          <LocationForm
  action={action}
  initialData={initialData}
  targetId={this.props.match.params.id}
  location={this.location}
/>
        }
      />
    );
  }

  renderLoading() {
    if (!this.props.hasError) {
      return <p>Loading...</p>;
    }
    if (this.props.hasError) {
      return <p> {this.props.errorMessage.message} </p>;
    }
  }
}

function mapStateToProps(state, ownProps) {
  return {
    locationById: locationSelectors.getLocationById(state, ownProps.match.params.id),
    currentLocation: locationSelectors.getCurrentLocation(state),
    hasError: errorHandlerSelectors.getHasError(state),
    errorMessage: errorHandlerSelectors.getErrorMessage(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchLocation: locationActions.fetchLocation,
      noTitle: globalActions.toggleTitleOff
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationEditForm);
