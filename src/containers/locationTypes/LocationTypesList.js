// Smart component that renders the LocationTypes List view
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";

import * as locationTypeActions from "../../store/locationTypes/actions";
import * as locationTypeSelectors from "../../store/locationTypes/reducer";
import * as globalActions from "../../store/global/actions";

import ListView from "../../components/ListView";
import ElementMap from "../ElementMap";

export class LocationTypesList extends Component {
  componentDidMount() {
    this.props.showListTitle();
    this.props.fetchLocationTypes();
    this.props.changePageTitle("Location Types");
    this.props.changePageTitleButton("+ Create Location Type");
    this.props.changePageTarget("/locationTypes/new");
  }

  render() {
    if (!this.props.rowsById) return this.renderLoading();
    return (
      <div className="LocationTypeList">
        <ListView
          renderHeaders={this.renderHeaders}
          rowsIdArray={this.props.rowsIdArray}
          rowsById={this.props.rowsById}
          renderRow={this.renderRow}
        />
      </div>
    );
  }

  renderLoading() {
    return <p>Loading...</p>;
  }

  renderRow(row) {
    const rowItems = [
      <Link to={`/locationTypes/edit/${row.id}`} key="link_to">
        {row.attributes.name}
      </Link>
    ];
    return <ElementMap items={rowItems} HTMLTag="td" />;
  }

  renderHeaders() {
    const headerItems = ["Name"];
    return <ElementMap items={headerItems} HTMLTag="th" />;
  }
}

function mapStateToProps(state) {
  return {
    rowsById: locationTypeSelectors.getLocationTypesById(state),
    rowsIdArray: locationTypeSelectors.getLocationTypesIdArray(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchLocationTypes: locationTypeActions.fetchLocationTypes,
      changePageTitle: globalActions.changePageTitle,
      changePageTitleButton: globalActions.changePageTitleButton,
      showListTitle: globalActions.toggleDetailTitleOff,
      changePageTarget: globalActions.changePageTarget
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationTypesList);
