// TaskStatus Change Component
// Deals with Switching Active Status of a Task
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Redirect } from "react-router-dom";

import * as taskSelectors from "../../store/tasks/reducer";
import * as taskActions from "../../store/tasks/actions";
import * as errorHandlerSelectors from "../../store/errorHandler/reducer";
import * as globalAction from "../../store/global/actions";

export class TaskStatusChange extends Component {
  componentDidMount() {
    this.props.fetchTask(this.props.match.params.id);
  }

  render() {
    this.task = this.props.taskById;
    if (!this.task) return this.renderLoading();
    var status = this.task.attributes.status;

    if (status === "Active") {
      status = "b";
    } else {
      status = "a";
    }

    const payload = {
      data: {
        type: "Task",
        id: this.task.id,
        data: {
          status: status
        }
      }
    };

    this.props.editTask(payload, this.task.id);
    return <Redirect to={`/tasks/${this.task.id}`} />;
  }

  renderLoading() {
    if (this.props.hasError) {
      return <p>Task cloning failed</p>;
    } else {
      return <p>Task cloning in progress..</p>;
    }
  }
}

function mapStateToProps(state, ownProps) {
  return {
    taskById: taskSelectors.getTaskById(state, ownProps.match.params.id),
    hasError: errorHandlerSelectors.getHasError
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchTask: taskActions.fetchTask,
      noTitle: globalAction.toggleDetailTitleOff,
      editTask: taskActions.editTask
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskStatusChange);
