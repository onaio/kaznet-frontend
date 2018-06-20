// services are state-less
// they act as utility facades that abstract the details for complex operations
// normally, our interface to any sort of server API will be as a service

import _ from "lodash";

import * as constants from "../constants";

class TaskService {
  async getTaskList() {
    const url = `${constants.API_ENDPOINT}/tasks/?format=vnd.api%2Bjson`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/vnd.api+json",
        Authorization: `Token ${constants.API_TOKEN}`
      }
    });
    if (!response.ok) {
      throw new Error(
        `TaskService getTaskList failed, HTTP status ${response.status}`
      );
    }
    const apiResponse = await response.json();
    const data = _.get(apiResponse, "data");
    if (!data) {
      throw new Error(`TaskService getTaskList failed, data not returned`);
    }
    return _.map(data, task => {
      return task;
    });
  }
}

export default new TaskService();
