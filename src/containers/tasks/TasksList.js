// Smart component that renders the Task list view
import React, { Component } from "react";
import { connect } from "react-redux";

import * as taskActions from "../../store/tasks/actions";
import * as globalActions from "../../store/global/actions";
import * as taskSelectors from "../../store/tasks/reducer";

import ListView from "../../components/ListView";
import ElementMap from "../ElementMap";

class TasksList extends Component {
  componentDidMount() {
    this.props.dispatch(taskActions.fetchTasks());
    this.props.dispatch(globalActions.changePageTitle("Tasks"));
    this.props.dispatch(globalActions.changePageTitleButton("+ Create Task"));
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
      row.attributes.status,
      row.attributes.name,
      row.attributes.pending_submissions_count +
        "/" +
        row.attributes.submission_count,
      row.attributes.created,
      row.attributes.end,
      "XFORM TITLE"
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

export default connect(mapStateToProps)(TasksList);
