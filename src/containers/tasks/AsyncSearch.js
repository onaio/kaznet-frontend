import React, { Component } from "react";
import { connect } from "react-redux";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { bindActionCreators } from "redux";

import * as formActions from "../../store/forms/actions";
import * as clientActions from "../../store/clients/actions";
import * as locationActions from "../../store/locations/actions";

import * as formSelectors from "../../store/forms/reducer";
import * as clientSelectors from "../../store/clients/reducer";
import * as locationSelectors from "../../store/locations/reducer";

import * as constants from "../../constants.js";

export class AsyncSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
    this.onSearchEvent = this.onSearchEvent.bind(this);
  }

  async componentDidMount() {
    const { type } = this.props;
    switch (type) {
      case "forms":
        await this.props.fetchForms(
          `${constants.API_ENDPOINT}/${type}/?has_task=false`
        );
        break;
      case "clients":
        await this.props.fetchClients(`${constants.API_ENDPOINT}/${type}/`);
        break;
      case "locations":
        await this.props.fetchLocations(`${constants.API_ENDPOINT}/locations/`);
        break;
      default:
      // hande this
    }
  }

  onSearchEvent(query) {
    const { type } = this.props;
    switch (type) {
      case "forms":
        this.props.fetchForms(
          `${constants.API_ENDPOINT}/${type}/?search=${query}&has_task=false`
        );
        break;
      case "clients":
        this.props.fetchClients(
          `${constants.API_ENDPOINT}/${type}/?search=${query}`
        );
        break;
      case "locations":
        this.props.fetchLocations(
          `${constants.API_ENDPOINT}/${type}/?search=${query}`
        );
        break;
      default:
      // hande this
    }
  }

  render() {
    const { type } = this.props;
    const getOptions =
      type === "forms"
        ? this.props.formOptions
        : type === "clients"
          ? this.props.clientOptions
          : type === "locations"
            ? this.props.locationOptions
            : null;

    const isLoading =
      type === "forms"
        ? this.props.formsIsLoading
        : type === "clients"
          ? this.props.clientsIsLoading
          : type === "locations"
            ? this.props.locationsIsLoading
            : null;

    return (
      <AsyncTypeahead
        isLoading={isLoading || false}
        minLength={0}
        onSearch={this.onSearchEvent}
        options={getOptions}
        placeholder={`Choose ${this.props.type}`}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    formOptions: formSelectors.getFormOptions(state),
    locationOptions: locationSelectors.getLocationOptions(state),
    clientOptions: clientSelectors.getClientOptions(state),
    formsIsLoading: formSelectors.isLoading(state),
    locationsIsLoading: locationSelectors.isLoading(state),
    clientsIsLoading: clientSelectors.isLoading(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchForms: formActions.fetchForms,
      fetchClients: clientActions.fetchClients,
      fetchLocations: locationActions.fetchLocations
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AsyncSearch);
