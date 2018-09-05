import React, { Component } from "react";
import moment from "moment";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as taskActions from "../../store/tasks/actions";
import TaskForm from "./TaskForm";
import FormView from "../../components/FormView";
import * as globalActions from "../../store/global/actions";
import { TASK_DRAFT, BEGINNER } from "../../constants";

export class TaskCreateForm extends Component {
  componentDidMount() {
    this.props.noTitle();
  }

  render() {
    const action = taskActions.createTask;
    const initialData = {
      name: "",
      estimated_time: "15",
      start: moment().format("YYYY-MM-DD"),
      end: moment().format("YYYY-MM-DD"),
      description: "",
      required_expertise: BEGINNER,
      timing_rule: "",
      status: TASK_DRAFT,
      user_submission_target: 10,
      amount: "",
      tasklocation_location: "",
      tasklocation_timing_rule: "FREQ=DAILY;INTERVAL=1;COUNT=1",
      tasklocation_start: "09:00",
      tasklocation_end: "17:00"
    };

    return (
      <FormView
        form={
          <TaskForm
            initialData={initialData}
            action={action}
            redirectAfterAction="/tasks"
          />
        }
      />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      noTitle: globalActions.toggleTitleOff
    },
    dispatch
  );
}

export default connect(
  null,
  mapDispatchToProps
)(TaskCreateForm);
