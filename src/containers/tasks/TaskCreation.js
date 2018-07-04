import React, { Component } from "react";
import moment from "moment";

import * as taskActions from "../../store/tasks/actions";
import TaskForm from "./TaskForm";
import FormView from "../../components/FormView";

export default class TaskCreation extends Component {
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
