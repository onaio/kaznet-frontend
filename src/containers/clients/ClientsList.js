import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import queryString from "query-string";

import * as clientActions from "../../store/clients/actions";
import * as clientSelectors from "../../store/clients/reducer";
import * as globalActions from "../../store/global/actions";
import * as constants from "../../constants.js";

import ListView from "../../components/ListView";
import ElementMap from "../ElementMap";

export class ClientsList extends Component {
  async componentDidMount() {
    this.props.showListTitle();
    this.props.changePageTitle("Clients");
    this.props.changePageTitleButton("+ Add Client");
    this.props.changePageTarget("/clients/new");

    let { search } = queryString.parse(this.props.location.search);
    const { page } = queryString.parse(this.props.location.search);

    if (search === undefined) {
      search = "";
    }
    this.props.searchVal(search);

    let pageNumber = Number(page);

    if (isNaN(pageNumber)) {
      pageNumber = 1;
    }

    if (search === "") {
      await this.props.fetchClients(
        `${constants.API_ENDPOINT}/clients/?search=${search}&page=${pageNumber}`
      );
      console.log("a");
      this.props.changePageNumber(pageNumber);
    } else if (search !== "") {
      await this.props.fetchClients(
        `${constants.API_ENDPOINT}/clients/?search=${search}&page=${pageNumber}`
      );
      console.log("b");
      console.log(pageNumber);
    } else {
      this.props.fetchClients();
      console.log("c");
    }
  }

  componentDidUpdate(prevProps) {
    if (/\?page=(\d|\w)/.test(this.props.location.search)) {
      const { page } = queryString.parse(this.props.location.search);
      if (Number(page) !== this.props.currentPage && !isNaN(page)) {
        const pageNumber = Number(page);
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
          renderRow={this.renderRow}
          endpoint={"clients"}
          pageLinks={this.props.pageLinks}
          totalPages={this.props.totalPages}
          currentPage={this.props.currentPage}
          firstPage={this.props.firstPage}
          lastPage={this.props.lastPage}
          searchVal={this.props.searchParam}
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
  console.log("state>>>>>>>>", state);
  return {
    rowsById: clientSelectors.getClientsById(state),
    rowsIdArray: clientSelectors.getClientsIdArray(state),
    totalPages: clientSelectors.getTotalPages(state),
    currentPage: clientSelectors.getCurrentPage(state),
    pageLinks: clientSelectors.getPageLinks(state),
    firstPage: clientSelectors.getFirstPage(state),
    lastPage: clientSelectors.getLastPage(state),
    searchParam: state.clients.searchVal
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
      showListTitle: globalActions.toggleDetailTitleOff,
      searchVal: clientActions.getSearchVal
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientsList);
