// Smart component that renders the Locations List view
import React, { Component } from "react";
import voca from "voca";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import queryString from "query-string";

import * as locationActions from "../../store/locations/actions";
import * as locationSelectors from "../../store/locations/reducer";
import * as globalActions from "../../store/global/actions";
import * as constants from "../../constants.js";

import ListView from "../../components/ListView";
import ElementMap from "../ElementMap";

export class LocationsList extends Component {
  async componentDidMount() {
    this.props.showListTitle();
    this.props.changePageTitle("Locations");
    this.props.changePageTitleButton("+ Create Location");
    this.props.changePageTarget("/locations/new");

    if (/\?page=(\d|\w)/.test(this.props.location.search)) {
      const { page } = queryString.parse(this.props.location.search);
      const pageNumber = Number(page);
      if (!isNaN(pageNumber)) {
        await this.props.fetchLocations(
          `${constants.API_ENDPOINT}/locations/?page=${pageNumber}`
        );
        this.props.changePageNumber(pageNumber);
      }
    } else {
      this.props.fetchLocations();
    }
  }

  componentDidUpdate(prevProps) {
    if (/\?page=(\d|\w)/.test(this.props.location.search)) {
      const { page } = queryString.parse(this.props.location.search);
      if (Number(page) !== this.props.currentPage && !isNaN(page)) {
        const pageNumber = Number(page);
        this.props.fetchLocations(
          `${constants.API_ENDPOINT}/locations/?page=${pageNumber}`
        );
        this.props.changePageNumber(pageNumber);
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
          firstPage={this.props.firstPage}
          lastPage={this.props.lastPage}
        />
      </div>
    );
  }

  renderLoading() {
    return <p>Loading...</p>;
  }

  renderRow(row) {
    const rowItems = [
      <Link to={`/locations/edit/${row.id}`} key="link_to">
        {row.attributes.name}
      </Link>,
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
    totalPages: locationSelectors.getTotalPages(state),
    currentPage: locationSelectors.getCurrentPage(state),
    pageLinks: locationSelectors.getPageLinks(state),
    firstPage: locationSelectors.getFirstPage(state),
    lastPage: locationSelectors.getLastPage(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchLocations: locationActions.fetchLocations,
      changePageNumber: locationActions.changePageNumber,
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
