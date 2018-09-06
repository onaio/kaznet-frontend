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
      isLoading: false
    });
    this.onSearchEvent = this.onSearchEvent.bind(this);
  }

  async componentWillMount() {
    const { type } = this.props;
    await this.props.fetchClients();
    if (this.props.task) {
      if (type === "clients") {
        let clientValue;
        Object.keys(this.props.clientsById).forEach(k => {
          if (
            this.props.task.relationships.client.data.id ===
            this.props.clientsById[k].id
          ) {
            clientValue = this.props.clientsById[k].attributes.name;
          }
        });
        if (clientValue !== undefined) {
          this.props.clientName(clientValue);
        }
      } else if (type === "forms") {
        const formValue = this.props.task.attributes.xform_title;
        if (formValue && formValue !== undefined) {
          this.props.formName(formValue);
        }
      }
    }
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
        let formId;
        Object.keys(this.props.unusedFormsById).forEach(k => {
          if (option[0] === this.props.unusedFormsById[k].attributes.title) {
            formId = this.props.unusedFormsById[k].id;
          }
        });
        formSelected = {
          type: "forms",
          option: option[0],
          id: formId
        };
        this.props.formSelectedOption(formSelected);
        break;
      case "clients":
        let clientId;
        Object.keys(this.props.clientsById).forEach(k => {
          if (option[0] === this.props.clientsById[k].attributes.name) {
            clientId = this.props.clientsById[k].id;
          }
        });
        clientSelected = {
          type: "clients",
          option: option[0],
          id: clientId
        };
        this.props.clientSelectedOption(clientSelected);
        break;
      case "locations":
        let locationId;
        Object.keys(this.props.locationsById).forEach(k => {
          if (option[0] === this.props.locationsById[k].attributes.name) {
            locationId = this.props.locationsById[k].id;
          }
        });
        locationSelected = {
          type: "locations",
          option: option[0],
          id: locationId
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

    const val =
      type === "forms" && this.props.getFormName !== ""
        ? this.props.getFormName
        : type === "clients" && this.props.getClientName !== ""
          ? this.props.getClientName
          : type === "locations"
            ? ""
            : "";

    return this.props.task ? (
      this.props.getFormName !== "" && this.props.getClientName !== "" ? (
        <AsyncTypeahead
          isLoading={isLoading || false}
          minLength={0}
          onSearch={this.onSearchEvent}
          options={getOptions}
          placeholder={`Choose ${this.props.type}`}
          onChange={e => this.handleChange(e, type)}
          defaultInputValue={this.props.task ? val : ""}
        />
      ) : null
    ) : (
      <AsyncTypeahead
        isLoading={isLoading || false}
        minLength={0}
        onSearch={this.onSearchEvent}
        options={getOptions}
        placeholder={`Choose ${this.props.type}`}
        onChange={e => this.handleChange(e, type)}
        defaultInputValue={""}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    clientsById: clientSelectors.getClientsById(state),
    locationsById: locationSelectors.getLocationsById(state),
    unusedFormsById: formSelectors.getUnusedFormsById(state),
    formOptions: formSelectors.getFormOptions(state),
    locationOptions: locationSelectors.getLocationOptions(state),
    clientOptions: clientSelectors.getClientOptions(state),
    formsIsLoading: formSelectors.isLoading(state),
    locationsIsLoading: locationSelectors.isLoading(state),
    clientsIsLoading: clientSelectors.isLoading(state),
    selectedLocation: locationSelectors.getLocationSelectedOption(state),
    selectedForm: formSelectors.getFormSelectedOption(state),
    selectedClient: clientSelectors.getClientSelectedOption(state),
    getClientName: clientSelectors.getClientName(state),
    getFormName: formSelectors.getFormName(state)
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
      formSelectedOption: formActions.formSelectedOption,
      clientName: clientActions.clientName,
      formName: formActions.formName
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AsyncSearch);
