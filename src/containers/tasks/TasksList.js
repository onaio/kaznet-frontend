// Smart component that renders the Task list view
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import Moment from "react-moment";
import queryString from "query-string";
import { Badge } from "reactstrap";

import * as taskActions from "../../store/tasks/actions";
import * as globalActions from "../../store/global/actions";
import * as taskSelectors from "../../store/tasks/reducer";
import * as constants from "../../constants.js";

import ListView from "../../components/ListView";
import ElementMap from "../ElementMap";

import "./TaskList.css";

export class TasksList extends Component {
  async componentDidMount() {
    this.props.showListTitle();
    this.props.changePageTitle("Tasks");
    this.props.changePageTitleButton("+ Create Task");
    this.props.changePageTarget("/tasks/new");

    const { page } = queryString.parse(this.props.location.search);
    let pageNumber = Number(page);

    if (isNaN(pageNumber)) {
      pageNumber = 1;
    }
    if (pageNumber) {
      await this.props.fetchTasks(
        `${constants.API_ENDPOINT}/tasks/?page=${pageNumber}`
      );
      this.props.changePageNumber(pageNumber);
    } else {
      this.props.fetchTasks();
    }
  }

  componentDidUpdate(prevProps) {
    const { page } = queryString.parse(this.props.location.search);
    if (Number(page) !== this.props.currentPage && !isNaN(page)) {
      const pageNumber = Number(page);
      this.props.fetchTasks(
        `${constants.API_ENDPOINT}/tasks/?page=${pageNumber}`
      );
      this.props.changePageNumber(pageNumber);
    }
  }

  render() {
    if (!this.props.rowsById) return this.renderLoading();
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
        />
      </div>
    );
  }

  renderLoading() {
    return <p>Loading...</p>;
  }

  renderHeaders() {
    const headerItems = [
      "Status",
      "Name",
      "Need Review",
      "Created",
      "Expires",
      "Form"
    ];
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
    lastPage: taskSelectors.getLastPage(state)
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
      showListTitle: globalActions.toggleDetailTitleOff
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksList);
