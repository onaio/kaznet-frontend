import React, { Component } from "react";
import { connect } from "react-redux";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { bindActionCreators } from "redux";
import * as formActions from "../../store/forms/actions";
import * as formSelectors from "../../store/forms/reducer";
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
    await this.props.fetchForms(
      `${constants.API_ENDPOINT}/forms/?has_task=false`
    );
  }

  onSearchEvent(query) {
    this.props.fetchForms(
      `${constants.API_ENDPOINT}/forms/?search=${query}&has_task=false`
    );
  }

  render() {
    return (
      <AsyncTypeahead
        isLoading={this.props.isLoading}
        minLength={0}
        onSearch={this.onSearchEvent}
        options={this.props.options}
        placeholder="Choose a form..."
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    options: formSelectors.getFormOptions(state),
    isLoading: formSelectors.isLoading(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchForms: formActions.fetchForms
      // fetchOptions: formActions.fetchOptions,
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AsyncSearch);
