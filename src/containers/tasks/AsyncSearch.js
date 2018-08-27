import React, { Component } from "react";
import { connect } from "react-redux";
import AsyncSelect from "react-select/lib/Async";
import { bindActionCreators } from "redux";
import * as formActions from "../../store/forms/actions";
import * as formSelectors from "../../store/forms/reducer";
import * as constants from "../../constants.js";

export class AsyncSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.buildFormsArray = this.buildFormsArray.bind(this);
    this.filterOptions = this.filterOptions.bind(this);
    this.promiseOptions = this.promiseOptions.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.unusedFormsById &&
      Object.keys(nextProps.unusedFormsById).length > 0
    ) {
      this.setState({
        unusedFormsById: nextProps.unusedFormsById,
        options: this.buildFormsArray(nextProps.unusedFormsById)
      });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.inputValue !== this.state.inputValue) {
      this.setState({
        inputValue: nextState.inputValue,
        options: this.buildFormsArray(nextProps.unusedFormsById)
      });
    }
  }

  buildFormsArray(forms) {
    const formPks = Object.keys(forms);
    const buildArray = [];
    let form;
    for (let i = 0; i < formPks.length; i += 1) {
      form = forms[formPks[i]];
      buildArray.push({
        label: form.attributes.title,
        value: form.attributes.title.toLowerCase()
      });
    }
    return buildArray;
  }

  filterOptions(inputValue) {
    if (this.state && this.state.options) {
      this.state.options.filter(i =>
        i.value.includes(inputValue.toLowerCase())
      );
    }
  }

  promiseOptions(inputValue) {
    new Promise((res, rej) => {
      setTimeout(() => {
        res(this.filterOptions(inputValue));
      }, 10);
    });
  }

  handleInputChange(newValue) {
    if (!newValue) return false;
    const inputValue = newValue.replace(/\W/g, "");
    // refactor this to dispatch the val to store after querying API
    this.props.fetchForms(
      `${constants.API_ENDPOINT}/forms/?search=${inputValue}&has_task=false`
    );
    this.setState({
      inputValue
    });
    return true;
  }

  render() {
    console.log("state", this.state);
    return (
      <AsyncSelect
        cacheOptions
        defaultOptions
        loadOptions={this.promiseOptions}
        onInputChange={this.handleInputChange}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    unusedFormsById: formSelectors.getUnusedFormsById(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchForms: formActions.fetchForms
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AsyncSearch);
