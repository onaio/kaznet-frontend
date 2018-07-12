// Smart component that renders the Locations List view
import React, { Component } from "react";
import voca from "voca";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import queryString from "query-string";

import * as constants from "../../constants.js";
import * as locationActions from "../../store/locations/actions";
import * as locationSelectors from "../../store/locations/reducer";
import * as globalActions from "../../store/global/actions";

import ListView from "../../components/ListView";
import ElementMap from "../ElementMap";

export class LocationsList extends Component {
  async componentDidMount() {
    this.props.showListTitle();
    this.props.fetchLocations();
    this.props.changePageTitle("Locations");
    this.props.changePageTitleButton("+ Create Location");

    this.props.changePageNumber(1);

    if (this.props.location) {
      const page = queryString.parse(this.props.location.search).page;
      await this.props.fetchLocations();
      if (page) {
        this.props.changePageNumber(Number(page));
      }
    }
  }

  componentDidUpdate(prevProps) {
    const { page } = queryString.parse(this.props.location.search);

    if (isNaN(Number(page)) && !(page === undefined)) {
      const url = this.props.pageLinks[page];
      this.props.fetchLocations(url);
    } else if (page === undefined) {
      this.props.fetchLocations();
    } else {
      if (Number(page) !== this.props.currentPage) {
        this.props.fetchLocations(
          `${constants.API_ENDPOINT}/locations/?page=${page}`
        );
      }
    }
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
          endpoint={"locations"}
          pageLinks={this.props.pageLinks}
          totalPages={this.props.totalPages}
          currentPage={this.props.currentPage}
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
    rowsIdArray: locationSelectors.getLocationsIdArray(state),
    pageLinks: locationSelectors.getPageLinks(state),
    totalPages: locationSelectors.getTotalPages(state),
    currentPage: locationSelectors.getCurrentPage(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchLocations: locationActions.fetchLocations,
      changePageNumber: locationActions.changePageNumber,
      changePageTitle: globalActions.changePageTitle,
      changePageTitleButton: globalActions.changePageTitleButton,
      showListTitle: globalActions.toggleDetailTitleOff
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationsList);
