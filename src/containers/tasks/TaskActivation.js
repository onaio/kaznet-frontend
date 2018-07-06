import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as taskSelectors from "../../store/tasks/reducer";
import * as taskActions from "../../store/tasks/actions";

export class TasksActivation extends Component {
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
        attributes: {
          status: status
        }
      }
    };

    try {
      // Send EditTask Action
    } catch (error) {
      return <p>Error Occurred! Details: {`${error}`} </p>;
    }
    return <Redirect to={`/tasks/${this.task.id}`} />;
  }

  renderLoading() {
    return <p>Loading...</p>;
  }
}

function mapStateToProps(state) {
  return {
    taskById: taskSelectors.getTaskById(state, props.match.params.id)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchTask: taskActions.fetchTask
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksActivation);
