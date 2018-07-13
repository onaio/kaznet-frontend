// Smart component that renders the Locations List view
import React, { Component } from "react";
import voca from "voca";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as locationActions from "../../store/locations/actions";
import * as locationSelectors from "../../store/locations/reducer";
import * as globalActions from "../../store/global/actions";

import ListView from "../../components/ListView";
import ElementMap from "../ElementMap";

export class LocationsList extends Component {
  componentDidMount() {
    this.props.showListTitle();
    this.props.fetchLocations();
    this.props.changePageTitle("Locations");
    this.props.changePageTitleButton("+ Create Location");
    this.props.changePageTarget("/locations/new");
  }

  render() {
    if (!this.props.rowsById) return this.renderLoading();
    return (
      <div className="LocationList">
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
      row.attributes.name,
      row.attributes.parent_name,
      row.attributes.location_type_name,
      voca.truncate(row.attributes.description, 60)
    ];
    return <ElementMap items={rowItems} HTMLTag="td" />;
  }

  renderHeaders() {
    const headerItems = ["Name", "Parent", "Type", "Description"];
    return <ElementMap items={headerItems} HTMLTag="th" />;
  }
}

function mapStateToProps(state) {
  return {
    rowsById: locationSelectors.getLocationsById(state),
    rowsIdArray: locationSelectors.getLocationsIdArray(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchLocations: locationActions.fetchLocations,
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
)(LocationsList);
