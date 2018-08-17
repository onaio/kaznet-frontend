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
import * as constants from "../../constants.js";

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

    if (status === constants.DEACTIVATED) {
      status = constants.TASK_DEACTIVATED;
    } else if (status === constants.EXPIRED) {
      status = constants.TASK_EXPIRED;
    } else if (status === constants.SCHEDULED) {
      status = constants.TASK_SCHEDULED;
    } else if (status === constants.ARCHIVED) {
      status = constants.TASK_ARCHIVED;
    }

    const initialData = {
      name: this.task.attributes.name,
      estimated_time: moment
        .duration(
          this.task.attributes.estimated_time != null
            ? this.task.attributes.estimated_time
            : constants.ESTIMATED_TIME
        )
        .minutes(),
      start: moment(this.task.attributes.start).format(
        constants.TASK_DATE_FORMAT
      ),
      end: moment(
        this.task.attributes.end != null ? this.task.attributes.end : undefined
      ).format(constants.TASK_DATE_FORMAT),
      description:
        this.task.attributes.description != null
          ? this.task.attributes.description
          : "",
      required_expertise: this.task.attributes.required_expertise,
      timing_rule:
        this.task.attributes.timing_rule != null
          ? this.task.attributes.timing_rule
          : "",
      status: status,
      user_submission_target:
        this.task.attributes.user_submission_target != null
          ? this.task.attributes.user_submission_target
          : "",
      amount:
        this.task.attributes.current_bounty_amount != null
          ? parseInt(this.task.attributes.current_bounty_amount, 10)
          : "",
      form:
        this.task.attributes.target_id != null
          ? this.task.attributes.target_id
          : "",
      client:
        this.task.relationships.client.data != null
          ? this.task.relationships.client.data.id
          : "",
      tasklocation_location: this.task.attributes.task_locations[0]
        ? this.task.attributes.task_locations[0].location.id
        : "",
      tasklocation_timing_rule: this.task.attributes.task_locations[0]
        ? this.task.attributes.task_locations[0].timing_rule
        : constants.TASK_LOCATION_TIMING_RULE,
      tasklocation_start: this.task.attributes.task_locations[0]
        ? this.task.attributes.task_locations[0].start
        : constants.TASK_LOCATION_TIMING_RULE,
      tasklocation_end: this.task.attributes.task_locations[0]
        ? this.task.attributes.task_locations[0].end
        : constants.TASK_LOCATION_END
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
