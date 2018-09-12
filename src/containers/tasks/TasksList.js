// Smart component that renders the Task list view
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import Moment from "react-moment";
import { Badge } from "reactstrap";
import qs from "qs";
import * as taskActions from "../../store/tasks/actions";
import * as globalActions from "../../store/global/actions";
import * as taskSelectors from "../../store/tasks/reducer";
import * as globalSelectors from "../../store/global/reducer";
import * as errorHandlerSelectors from "../../store/errorHandler/reducer";
import * as constants from "../../constants.js";
import "../LoadListAnimation.css";
import ListView from "../../components/ListView";
import ElementMap from "../ElementMap";
import { withAlert } from "react-alert";

import "./TaskList.css";

export class TasksList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.handleChange = this.handleChange.bind(this);
  }
  async componentDidMount() {
    this.props.showListTitle();
    this.props.changePageTitle("Tasks");
    this.props.changePageTitleButton("+ Create Task");
    this.props.changePageTarget("/tasks/new");

    let { search } = qs.parse(this.props.location.search.slice(1));
    let { status } = qs.parse(this.props.location.search.slice(1));
    const { page } = qs.parse(this.props.location.search.slice(1));

    if (search === undefined) {
      search = "";
    }

    this.props.searchVal(search);

    if (status === undefined) {
      status = "";
    }

    this.props.getStatus(status);

    let pageNumber = Number(page);

    if (isNaN(pageNumber)) {
      pageNumber = 1;
    }

    await this.props.fetchTasks(
      `${constants.API_ENDPOINT}/tasks/?ordering=${
        constants.TASK_SORT_FIELD
      }&search=${search}&status=${status}&page=${pageNumber}`
    );
    this.props.changePageNumber(pageNumber);
  }

  componentDidUpdate(prevProps) {
    let { search } = qs.parse(this.props.location.search.slice(1));
    if (search === undefined) {
      search = "";
    }

    let { status } = qs.parse(this.props.location.search.slice(1));

    if (status === undefined) {
      status = "";
    }

    const { page } = qs.parse(this.props.location.search.slice(1));
    if (Number(page) !== this.props.currentPage && !isNaN(page)) {
      const pageNumber = Number(page);
      this.props.fetchTasks(
        `${constants.API_ENDPOINT}/tasks/?ordering=${
          constants.TASK_SORT_FIELD
        }&search=${search}&status=${status}&page=${pageNumber}`
      );
      this.props.changePageNumber(pageNumber);
    }

    if (this.props.hasError !== prevProps.hasError) {
      if (this.props.hasError === true) {
        this.props.alert.show(this.props.errorMessage);
      }
    }
  }

  handleChange(e) {
    const status = e.target.getAttribute("data-key");
    const param = `?status=${status}`;
    if (status === null) {
      this.setState({
        isOpen: !this.state.isOpen
      });
      return false;
    }
    this.props.fetchTasks(
      `${constants.API_ENDPOINT}/tasks/${status !== "" ? param : ""}`
    );
    this.props.getStatus(status !== "" ? status : "");
    this.setState({
      isOpen: !this.state.isOpen
    });
    return true;
  }

  render() {
    if (this.props.rowsIdArray.length <= 0) return this.renderLoading();
    return (
      <div className="TasksList">
        <ListView
          renderHeaders={this.renderHeaders}
          rowsIdArray={this.props.rowsIdArray}
          rowsById={this.props.rowsById}
          renderRow={this.renderRow}
          endpoint={"tasks"}
          pageLinks={this.props.pageLinks}
          totalPages={this.props.totalPages}
          currentPage={this.props.currentPage}
          firstPage={this.props.firstPage}
          lastPage={this.props.lastPage}
          searchVal={this.props.searchParam}
          sortField={constants.TASK_SORT_ATTRIBUTE}
          sortOrder={constants.SORT_DESC}
          taskStatus={this.props.taskStatus}
          isTaskPage={true}
          handleChange={this.handleChange}
          isOpen={this.state.isOpen}
        />
      </div>
    );
  }

  renderLoading() {
    return (
      <center>
        <div className="lds-ripple">
          <div />
          <div />
        </div>
      </center>
    );
  }

  renderHeaders() {
    const headerItems = ["Name", "Need Review", "Created", "Expires", "Form"];
    return <ElementMap items={headerItems} HTMLTag="th" />;
  }

  renderRow(row) {
    const rowItems = [
      <Badge
        key={row.id}
        className={"task-badge status-" + row.attributes.status}
      >
        {row.attributes.status_display}
      </Badge>,
      <Link to={`/tasks/${row.id}`} key="link_to">
        {row.attributes.name}
      </Link>,
      row.attributes.pending_submissions_count +
        "/" +
        row.attributes.submission_count,
      <Moment key={row.id} format="DD-MM-YYYY">
        {row.attributes.start}
      </Moment>,
      <Moment key={row.id} format="DD-MM-YYYY">
        {row.attributes.end}
      </Moment>,
      row.attributes.xform_title
    ];
    return <ElementMap items={rowItems} HTMLTag="td" />;
  }
}

// which props do we want to inject, given the global store state?
function mapStateToProps(state) {
  return {
    rowsById: taskSelectors.getTasksById(state),
    rowsIdArray: taskSelectors.getTasksIdArray(state),
    totalPages: taskSelectors.getTotalPages(state),
    currentPage: taskSelectors.getCurrentPage(state),
    pageLinks: taskSelectors.getPageLinks(state),
    firstPage: taskSelectors.getFirstPage(state),
    lastPage: taskSelectors.getLastPage(state),
    searchParam: globalSelectors.getSearchValue(state),
    taskStatus: taskSelectors.getTaskStatus(state),
    hasError: errorHandlerSelectors.getHasError(state),
    errorMessage: errorHandlerSelectors.getErrorMessage(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchTasks: taskActions.fetchTasks,
      changePageNumber: taskActions.changePageNumber,
      changePageTitle: globalActions.changePageTitle,
      changePageTitleButton: globalActions.changePageTitleButton,
      changePageTarget: globalActions.changePageTarget,
      showListTitle: globalActions.toggleDetailTitleOff,
      searchVal: globalActions.getSearchVal,
      getStatus: taskActions.getStatus
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAlert(TasksList));
