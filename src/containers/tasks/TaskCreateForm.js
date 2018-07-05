import React, { Component } from "react";
import moment from "moment";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as taskActions from "../../store/tasks/actions";
import TaskForm from "./TaskForm";
import FormView from "../../components/FormView";
import * as globalActions from "../../store/global/actions";

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
      required_expertise: "1",
      timing_rule: "",
      status: "d",
      user_submission_target: 10,
      amount: ""
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
