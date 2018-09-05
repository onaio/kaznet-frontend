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

import Immutable from "seamless-immutable";

export class AsyncSearch extends Component {
  constructor(props) {
    super(props);
    this.state = Immutable({
      isLoading: false,
      formOption: null,
      clientOption: null,
      locationOption: null
    });
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

  handleChange(option, type) {
    let formSelected;
    let clientSelected;
    let locationSelected;
    switch (type) {
      case "forms":
        formSelected = {
          type: "forms",
          option: option[0],
          id: this.props.formOptions.indexOf(option[0])
        };
        this.props.formSelectedOption(formSelected);
        break;
      case "clients":
        clientSelected = {
          type: "clients",
          option: option[0],
          id: this.props.clientOptions.indexOf(option[0])
        };
        this.props.clientSelectedOption(clientSelected);
        break;
      case "locations":
        locationSelected = {
          type: "locations",
          option: option[0],
          id: this.props.locationOptions.indexOf(option[0])
        };
        this.props.locationSelectedOption(locationSelected);
        break;
      default:
      //
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
    console.log("this stte", this.state);
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
        onChange={e => this.handleChange(e, type)}
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
    clientsIsLoading: clientSelectors.isLoading(state),
    selectedLocation: locationSelectors.getLocationSelectedOption(state),
    selectedForm: formSelectors.getFormSelectedOption(state),
    selectedClient: clientSelectors.getClientSelectedOption(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchForms: formActions.fetchForms,
      fetchClients: clientActions.fetchClients,
      fetchLocations: locationActions.fetchLocations,
      clientSelectedOption: clientActions.clientSelectedOption,
      locationSelectedOption: locationActions.locationSelectedOption,
      formSelectedOption: formActions.formSelectedOption
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AsyncSearch);
