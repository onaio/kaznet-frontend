import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import queryString from "query-string";

import * as constants from "../../constants.js";
import * as clientActions from "../../store/clients/actions";
import * as clientSelectors from "../../store/clients/reducer";
import * as globalActions from "../../store/global/actions";

import ListView from "../../components/ListView";
import ElementMap from "../ElementMap";

export class ClientsList extends Component {
  async componentDidMount() {
    this.props.showListTitle();
    this.props.changePageTitle("Clients");
    this.props.changePageTitleButton("+ Add Client");
    this.props.changePageTarget("/clients/new");

    if (/\?page=(\d|\w)/.test(this.props.location.search)) {
      const { page } = queryString.parse(this.props.location.search);
      await this.props.fetchClients();
      this.props.changePageNumber(Number(page));
    } else {
      this.props.fetchClients();
    }
  }

  componentDidUpdate(prevProps) {
    if (/\?page=(\d|\w)/.test(this.props.location.search)) {
      const { page } = queryString.parse(this.props.location.search);
      let pageNumber;

      if (isNaN(Number(page)) && page !== undefined) {
        const url = this.props.pageLinks[page];
        if (queryString.parse(url).page) {
          pageNumber = Number(queryString.parse(url).page);
        } else {
          pageNumber = Number(Object.values(queryString.parse(url))[0]);
        }
      } else if (Number(page) !== this.props.currentPage) {
        pageNumber = Number(page);
      }

      if (Number(pageNumber) !== this.props.currentPage && !isNaN(pageNumber)) {
        this.props.fetchClients(
          `${constants.API_ENDPOINT}/clients/?page=${pageNumber}`
        );
        this.props.changePageNumber(pageNumber);
      }
    }
  }

  render() {
    if (!this.props.rowsById) return this.renderLoading();
    return (
      <div className="ClientsList">
        <ListView
          renderHeaders={this.renderHeaders}
          rowsIdArray={this.props.rowsIdArray}
          rowsById={this.props.rowsById}
          endpoint={"clients"}
          renderRow={this.renderRow}
          pageLinks={this.props.pageLinks}
          currentPage={this.props.currentPage}
          totalPages={this.props.totalPages}
        />
      </div>
    );
  }

  renderLoading() {
    return <p>Loading...</p>;
  }

  renderHeaders() {
    const headerItems = ["Name", "Created"];
    return <ElementMap items={headerItems} HTMLTag="th" />;
  }

  renderRow(row) {
    const rowItems = [
      <Link to={`/clients/edit/${row.id}`} key="link_to">
        {row.attributes.name}
      </Link>,
      <Moment key={row.id} format="DD-MM-YYYY">
        {row.attributes.created}
      </Moment>
    ];
    return <ElementMap items={rowItems} HTMLTag="td" />;
  }
}

function mapStateToProps(state) {
  return {
    rowsById: clientSelectors.getClientsById(state),
    rowsIdArray: clientSelectors.getClientsIdArray(state),
    pageLinks: clientSelectors.getPageLinks(state),
    totalPages: clientSelectors.getTotalPages(state),
    currentPage: clientSelectors.getCurrentPage(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchClients: clientActions.fetchClients,
      changePageNumber: clientActions.changePageNumber,
      changePageTitle: globalActions.changePageTitle,
      changePageTitleButton: globalActions.changePageTitleButton,
      changePageTarget: globalActions.changePageTarget,
      showListTitle: globalActions.toggleDetailTitleOff
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientsList);
