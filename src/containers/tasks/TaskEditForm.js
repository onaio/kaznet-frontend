import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import "../LoadListAnimation.css";
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
          ? parseInt(
              this.task.attributes.current_bounty_amount,
              constants.USER_SUBMISSION_TARGET
            )
          : "",
      form:
        this.task.attributes.target_id && this.task.attributes.xform_title
          ? {
              value: this.task.attributes.target_id,
              label: this.task.attributes.xform_title
            }
          : "",
      client:
        this.task.relationships.client.data != null
          ? {
              value: this.task.relationships.client.data.id,
              label: this.task.attributes.client_name
            }
          : "",
      taskLocations:
        this.task.attributes.task_locations &&
        this.task.attributes.task_locations.length > 0
          ? this.task.attributes.task_locations
              .asMutable()
              .map(taskLocationItem => ({
                start: taskLocationItem.start,
                end: taskLocationItem.end,
                timing_rule: taskLocationItem.timing_rule,
                location: {
                  value: taskLocationItem.location.id,
                  label: taskLocationItem.location_name
                }
              }))
          : {
              start: constants.TASK_LOCATION_START,
              end: constants.TASK_LOCATION_END,
              timing_rule: constants.TASK_LOCATION_TIMING_RULE,
              location: ""
            }
    };

    return (
      <FormView
        form={
          <TaskForm
            initialData={initialData}
            action={action}
            targetId={this.props.match.params.id}
            task={this.task}
            redirectAfterAction={`/tasks/${this.task.id}`}
          />
        }
      />
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
