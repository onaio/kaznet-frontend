import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as locationSelectors from "../../store/locations/reducer";
import * as locationActions from "../../store/locations/actions";
import * as globalActions from "../../store/global/actions";
import * as errorHandlerSelectors from "../../store/errorHandler/reducer";
import * as constants from "../../constants";

import NestedElementMap from "../NestedElementMap";
import DetailView from "../../components/DetailView";
import LocationDetailTitle from "../../components/location/LocationDetailTitle";

export class LocationDetail extends Component {
  componentDidMount() {
    this.props.fetchLocation(this.props.match.params.id);
    this.props.noTitle();
  }

  render() {
    this.location = this.props.locationById;
    if (!this.location) return this.renderLoading();
    const xformURL = `${constants.ONA_WEBSITE}/${constants.ONA_USERNAME}/${
      this.location.attributes.xform_project_id
    }/${this.location.attributes.xform_ona_id}`;
    return (
      <div className="LocationsList">
        <LocationDetailTitle location={this.location} />
        <DetailView
          renderMainDetails={this.renderMainDetails(xformURL)}
          renderAdditionalDetails={this.renderAdditionalDetails()}
        />
      </div>
    );
  }

  renderLoading() {
    if (!this.props.hasError) {
      return <p>Loading...</p>;
    } else if (this.props.hasError) {
      return <p> {this.props.errorMessage.message} </p>;
    }
  }

  renderMainDetails(xformURL) {
    const headerItems = {
      Description: this.location.attributes.description,
      "Parent Location": this.location.attributes.parent_name,
      Country: this.location.attributes.country,
      "Location Type": this.location.attributes.location_type_name
    };

    return <NestedElementMap detailitems={headerItems} HTMLTag="td" />;
  }

  renderAdditionalDetails() {
    const headerItems = {
      Radius: this.location.attributes.radius,
      Shapefile: this.location.attributes.shapefile
    };

    return <NestedElementMap detailitems={headerItems} HTMLTag="td" />;
  }
}

function mapStateToProps(state, props) {
  return {
    locationById: locationSelectors.getLocationById(
      state,
      props.match.params.id
    ),
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
