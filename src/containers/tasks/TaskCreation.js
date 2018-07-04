import React, { Component } from "react";
import moment from "moment";

import TaskService from "../../services/tasks";
import TaskForm from "./TaskForm";
import FormView from "../../components/FormView";

export default class TaskCreation extends Component {
  render() {
    const service = TaskService.createTask;
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
            service={service}
            redirectAfterAction="/tasks"
          />
        }
      />
    );
  }
}
