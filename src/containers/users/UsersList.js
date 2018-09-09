import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Moment from "react-moment";
import { Button } from "reactstrap";
import qs from "qs";

import * as userActions from "../../store/users/actions";
import * as globalActions from "../../store/global/actions";
import * as globalSelectors from "../../store/global/reducer";
import * as userSelectors from "../../store/users/reducer";
import * as constants from "../../constants.js";

import ListView from "../../components/ListView";
import ElementMap from "../ElementMap";

export class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      userId: null,
      userName: null,
      start: "",
      end: ""
    };
    this.toggle = this.toggle.bind(this);
    this.setUserDetails = this.setUserDetails.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.handleDateChanges = this.handleDateChanges.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  setUserDetails(userId = null, userName = null) {
    this.setState({ userId: userId, userName: userName });
  }

  handleDateChanges(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onFormSubmit(e) {
    this.props.exportUserSubmissions(
      this.state.userId,
      this.state.start,
      this.state.end
    );
    e.preventDefault();
  }

  async componentDidMount() {
    this.props.showListTitle();
    this.props.changePageTitle("Users");
    this.props.changePageTitleButton("+ Create User");
    this.props.changePageTarget("/users/new");

    let { search } = qs.parse(this.props.location.search.slice(1));
    const { page } = qs.parse(this.props.location.search.slice(1));

    if (search === undefined) {
      search = "";
    }
    this.props.searchVal(search);
    let pageNumber = Number(page);

    if (isNaN(pageNumber)) {
      pageNumber = 1;
    }
    await this.props.fetchUsers(
      `${
        constants.API_ENDPOINT
      }/userprofiles/?search=${search}&page=${pageNumber}`
    );
    this.props.changePageNumber(pageNumber);
  }

  componentDidUpdate(prevProps) {
    let { search } = qs.parse(this.props.location.search.slice(1));
    if (search === undefined) {
      search = "";
    }
    const { page } = qs.parse(this.props.location.search.slice(1));
    if (Number(page) !== this.props.currentPage && !isNaN(page)) {
      const pageNumber = Number(page);
      this.props.fetchUsers(
        `${
          constants.API_ENDPOINT
        }/userprofiles/?search=${search}&page=${pageNumber}`
      );
      this.props.changePageNumber(pageNumber);
    }
  }

  render() {
    if (!this.props.rowsById) return this.renderLoading();
    return (
      <div className="UsersList">
        <ListView
          renderHeaders={this.renderHeaders}
          rowsIdArray={this.props.rowsIdArray}
          rowsById={this.props.rowsById}
          renderRow={this.renderRow}
          endpoint={"users"}
          pageLinks={this.props.pageLinks}
          totalPages={this.props.totalPages}
          currentPage={this.props.currentPage}
          firstPage={this.props.firstPage}
          lastPage={this.props.lastPage}
          searchVal={this.props.searchParam}
          downloadModalHandler={this.toggle}
          modalState={this.state.modal}
          setUserDetails={this.setUserDetails}
          userId={this.state.userId}
          userName={this.state.userName}
          onFormSubmit={this.onFormSubmit}
          handleDateChanges={this.handleDateChanges}
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

  renderRow(row, toggleExportModalFunction = null, setUserDetails = null) {
    const rowItems = [
      row.attributes.role_display,
      row.attributes.ona_username,
      row.attributes.last_name,
      row.attributes.first_name,
      <Button
        key={row.id}
        color="danger"
        onClick={function(event) {
          toggleExportModalFunction();
          setUserDetails(row.id, row.attributes.ona_username);
        }}
      >
        button label
      </Button>,
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
    totalPages: userSelectors.getTotalPages(state),
    currentPage: userSelectors.getCurrentPage(state),
    pageLinks: userSelectors.getPageLinks(state),
    firstPage: userSelectors.getFirstPage(state),
    lastPage: userSelectors.getLastPage(state),
    searchParam: globalSelectors.getSearchValue(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchUsers: userActions.fetchUsers,
      changePageNumber: userActions.changePageNumber,
      changePageTitle: globalActions.changePageTitle,
      changePageTitleButton: globalActions.changePageTitleButton,
      changePageTarget: globalActions.changePageTarget,
      showListTitle: globalActions.toggleDetailTitleOff,
      searchVal: globalActions.getSearchVal,
      exportUserSubmissions: userActions.exportUserSubmissions
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersList);
