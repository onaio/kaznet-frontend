import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as locationSelectors from '../../store/locations/reducer';
import * as locationActions from '../../store/locations/actions';
import * as globalActions from '../../store/global/actions';
import * as errorHandlerSelectors from '../../store/errorHandler/reducer';
import * as constants from '../../constants';

import NestedElementMap from '../NestedElementMap';
import DetailView from '../../components/DetailView';
import LocationDetailTitle from '../../components/location/LocationDetailTitle';

export class LocationDetail extends Component {
  componentDidMount() {
    this.props.fetchLocation(this.props.match.params.id);
    this.props.noTitle();
  }

  render() {
    this.location = this.props.locationById;
    if (!this.location) return this.renderLoading();
    return (
      <div className="LocationsList">
        <LocationDetailTitle location={this.location} />
        <DetailView
          renderMainDetails={this.renderMainDetails()}
          renderAdditionalDetails={this.renderAdditionalDetails()}
        />
      </div>
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

  renderMainDetails() {
    const headerItems = {
      Description: this.location.attributes.description,
      'Parent Location': this.location.attributes.parent_name,
      Country: this.location.attributes.country,
      'Location Type': this.location.attributes.location_type_name
    };

    return <NestedElementMap detailitems={headerItems} HTMLTag="td" />;
  }

  renderAdditionalDetails() {
    const headerItems = {
      Geopoint: this.location.attributes.geopoint
        ? [
            this.location.attributes.geopoint.coordinates[0].toFixed(4),
            '  ,   ',
            this.location.attributes.geopoint.coordinates[1].toFixed(4)
          ]
        : constants.NOT_APPLICABLE,
      Radius: this.location.attributes.radius
        ? [Math.round(this.location.attributes.radius), ' m']
        : constants.NOT_APPLICABLE,
      Shapefile: this.location.attributes.shapefile
        ? [this.location.attributes.name, '.shp']
        : constants.NOT_APPLICABLE
    };

    return <NestedElementMap detailitems={headerItems} HTMLTag="td" />;
  }
}

function mapStateToProps(state, props) {
  return {
    locationById: locationSelectors.getLocationById(state, props.match.params.id),
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
)(LocationDetail);
