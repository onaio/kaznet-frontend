// Smart component that renders the Task list view
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Moment from "react-moment";

import * as taskActions from "../../store/tasks/actions";
import * as globalActions from "../../store/global/actions";
import * as taskSelectors from "../../store/tasks/reducer";

import ListView from "../../components/ListView";
import ElementMap from "../ElementMap";

export class TasksList extends Component {
  componentDidMount() {
    this.props.fetchTasks();
    this.props.changePageTitle("Tasks");
    this.props.changePageTitleButton("+ Create Task");
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
      row.attributes.name,
      row.attributes.pending_submissions_count +
        "/" +
        row.attributes.submission_count,
      <Moment key={row.id} format="DD-MM-YYYY">
        {row.attributes.created}
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
    rowsIdArray: taskSelectors.getTasksIdArray(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchTasks: taskActions.fetchTasks,
      changePageTitle: globalActions.changePageTitle,
      changePageTitleButton: globalActions.changePageTitleButton
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksList);
