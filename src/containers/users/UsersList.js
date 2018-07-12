import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Moment from "react-moment";
import queryString from "query-string";

import * as constants from "../../constants.js";
import * as userActions from "../../store/users/actions";
import * as globalActions from "../../store/global/actions";
import * as userSelectors from "../../store/users/reducer";

import ListView from "../../components/ListView";
import ElementMap from "../ElementMap";

export class UsersList extends Component {
  async componentDidMount() {
    this.props.showListTitle();
    this.props.fetchUsers();
    this.props.changePageTitle("Users");
    this.props.changePageTitleButton("+ Create User");

    this.props.changePageNumber(1);
    if (this.props.location) {
      const page = queryString.parse(this.props.location.search).page;
      await this.props.fetchUsers();
      if (page) {
        this.props.changePageNumber(Number(page));
      }
    }
  }

  componentDidUpdate(prevProps) {
    const { page } = queryString.parse(this.props.location.search);
    if (isNaN(Number(page)) && !(page === undefined)) {
      const url = this.props.pageLinks[page];
      this.props.fetchUsers(url);
    } else if (page === undefined) {
      this.props.fetchUsers();
    } else {
      if (Number(page) !== this.props.currentPage) {
        this.props.fetchClients(
          `${constants.API_ENDPOINT}/clients/?page=${page}`
        );
      }
    }
  }

  render() {
    if (!this.props.rowsById) return this.renderLoading();
    return (
      <div className="UsersList">
        <ListView
          renderHeaders={this.renderHeaders}
          endpoint={"users"}
          rowsIdArray={this.props.rowsIdArray}
          rowsById={this.props.rowsById}
          renderRow={this.renderRow}
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

  renderHeaders() {
    const headerItems = [
      "Role",
      "Username",
      "Last Name",
      "First Name",
      "Submissions",
      "Approved %",
      "Last Active Date"
    ];
    return <ElementMap items={headerItems} HTMLTag="th" />;
  }

  renderRow(row) {
    const rowItems = [
      row.attributes.role_display,
      row.attributes.ona_username,
      row.attributes.last_name,
      row.attributes.first_name,
      row.attributes.submission_count,
      row.attributes.approval_rate * 100 + "%",
      <Moment key={row.id} format="DD-MM-YYYY">
        {row.attributes.last_login}
      </Moment>
    ];

    return <ElementMap items={rowItems} HTMLTag="td" />;
  }
}

// which props do we want to inject, given the global store state?
function mapStateToProps(state) {
  return {
    rowsById: userSelectors.getUsersById(state),
    rowsIdArray: userSelectors.getUsersIdArray(state),
    pageLinks: userSelectors.getPageLinks(state),
    totalPages: userSelectors.getTotalPages(state),
    currentPage: userSelectors.getCurrentPage(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchUsers: userActions.fetchUsers,
      changePageNumber: userActions.changePageNumber,
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
)(UsersList);
