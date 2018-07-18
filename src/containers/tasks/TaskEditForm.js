import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";

import TaskForm from "./TaskForm";
import FormView from "../../components/FormView";
import * as taskSelectors from "../../store/tasks/reducer";
import * as taskActions from "../../store/tasks/actions";
import * as errorHandlerSelectors from "../../store/errorHandler/reducer";
import * as globalActions from "../../store/global/actions";

export class TaskEditForm extends Component {
  componentDidMount() {
    this.props.fetchTask(this.props.match.params.id);
    this.props.noTitle();
  }

  render() {
    this.task = this.props.taskById;
    if (!this.task) {
      return this.renderLoading();
    }
    const action = taskActions.editTask;
    var status = this.task.attributes.status;

    if (status === "Deactivated") {
      status = "b";
    } else if (status === "Expired") {
      status = "c";
    } else if (status === "Scheduled") {
      status = "s";
    } else if (status === "Archived") {
      status = "e";
    }

    const initialData = {
      name: this.task.attributes.name,
      estimated_time: moment
        .duration(
          this.task.attributes.estimated_time != null
            ? this.task.attributes.estimated_time
            : "00:15"
        )
        .minutes(),
      start: moment(this.task.attributes.start).format("YYYY-MM-DD"),
      end: moment(
        this.task.attributes.end != null ? this.task.attributes.end : undefined
      ).format("YYYY-MM-DD"),
      description:
        this.task.attributes.descripton != null
          ? this.task.attributes.descripton
          : undefined,
      required_expertise: this.task.attributes.required_expertise,
      timing_rule:
        this.task.attributes.timing_rule != null
          ? this.task.attributes.timing_rule
          : "",
      status: status,
      user_submission_target:
        this.task.attributes.user_submission_target != null
          ? this.task.attributes.user_submission_target
          : undefined,
      amount:
        this.task.attributes.current_bounty_amount != null
          ? parseInt(this.task.attributes.current_bounty_amount, 10)
          : undefined,
      form:
        this.task.attributes.target_id != null
          ? this.task.attributes.target_id
          : undefined,
      client:
        this.task.relationships.client.data != null
          ? this.task.relationships.client.data.id
          : undefined,
      tasklocation_location: this.task.attributes.task_locations[0]
        ? this.task.attributes.task_locations[0].location.id
        : "",
      tasklocation_timing_rule: this.task.attributes.task_locations[0]
        ? this.task.attributes.task_locations[0].timing_rule
        : "FREQ=DAILY;INTERVAL=1;COUNT=1",
      tasklocation_start: this.task.attributes.task_locations[0]
        ? this.task.attributes.task_locations[0].start
        : "09:00",
      tasklocation_end: this.task.attributes.task_locations[0]
        ? this.task.attributes.task_locations[0].end
        : "17:00"
    };

    return (
      <FormView
        form={
          <TaskForm
            initialData={initialData}
            action={action}
            targetId={this.props.match.params.id}
            redirectAfterAction={`/tasks/${this.task.id}`}
          />
        }
      />
    );
  }

  renderLoading() {
    if (!this.props.hasError) {
      return <p>Loading...</p>;
    } else if (this.props.hasError) {
      return <p> {this.props.errorMessage.message} </p>;
    }
  }
}

function mapStateToProps(state, props) {
  return {
    taskById: taskSelectors.getTaskById(state, props.match.params.id),
    hasError: errorHandlerSelectors.getHasError(state),
    errorMessage: errorHandlerSelectors.getErrorMessage(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchTask: taskActions.fetchTask,
      noTitle: globalActions.toggleTitleOff
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskEditForm);
