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

    if (/\?page=(\d|\w)/.test(this.props.location.search)) {
      const { page } = queryString.parse(this.props.location.search);
      await this.props.fetchLocations();
      this.props.changePageNumber(Number(page));
    }
  }

  componentDidUpdate(prevProps) {
    if (/\?page=(\d|\w)/.test(this.props.location.search)) {
      const urlF = `${constants.API_ENDPOINT}/locations/?page=`;
      const { page } = queryString.parse(this.props.location.search);

      if (isNaN(Number(page)) && page !== undefined) {
        const url = this.props.pageLinks[page];

        let p;
        if (queryString.parse(url).page) {
          p = queryString.parse(url).page;
        } else {
          p = Object.values(queryString.parse(url))[0];
        }

        const pageNumber = Number(p);
        const url2 = urlF + pageNumber;
        if (Number(pageNumber) !== this.props.currentPage) {
          this.props.fetchLocations(url2);
          this.props.changePageNumber(pageNumber);
        }
      } else if (Number(page) !== this.props.currentPage) {
        const url = urlF + page;
        this.props.fetchLocations(url);
        this.props.changePageNumber(Number(page));
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
