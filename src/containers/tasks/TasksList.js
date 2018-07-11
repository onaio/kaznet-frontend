// Smart component that renders the Task list view
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import Moment from "react-moment";
import queryString from "query-string";

import * as taskActions from "../../store/tasks/actions";
import * as globalActions from "../../store/global/actions";
import * as selectors from "../../store/selectors";
import * as constants from "../../constants.js";

import ListView from "../../components/ListView";
import ElementMap from "../ElementMap";

export class TasksList extends Component {
  async componentDidMount() {
    const pageLinks = this.props.pageLinks;

    this.props.changePageNumber(1);

    if (this.props.location) {
      const page = queryString.parse(this.props.location.search).page;
      await this.props.fetchTasks();
      if (page) {
        this.props.changePageNumber(Number(page));
      }
    }

    this.props.changePageTitle("Tasks");
    this.props.changePageTitleButton("+ Create Task");
    this.props.changePageTarget("/tasks/new");
  }

  componentDidUpdate(prevProps) {
    const { page } = queryString.parse(this.props.location.search);
    if (isNaN(Number(page)) && !(page === undefined)) {
      const url = this.props.pageLinks[page];
      if (Number(page) !== this.props.currentPage) {
        this.props.fetchTasks(url);
      }
    } else if (page === undefined) {
      this.props.fetchTasks();
    } else {
      if (Number(page) !== this.props.currentPage) {
        this.props.fetchTasks(`${constants.API_ENDPOINT}/tasks/?page=${page}`);
      }
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
      row.attributes.status_display,
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
    rowsById: selectors.getTasksById(state),
    rowsIdArray: selectors.getTasksIdArray(state),
    pageLinks: selectors.getPageLinks("tasks", state),
    currentPage: selectors.getCurrentPage(state)
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
