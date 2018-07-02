import _ from "lodash";

import * as constants from "../constants";

class TaskService {
  async getTaskList() {
    const url = `${constants.API_ENDPOINT}/tasks/`;
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

  async createTask(task_data) {
    const url = `${constants.API_ENDPOINT}/tasks/`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/vnd.api+json",
        "content-type": "application/vnd.api+json",
        Authorization: `Token ${constants.API_TOKEN}`
      },
      body: JSON.stringify(task_data),
      cache: "no-cache"
    });
    if (!response.ok && response.status !== 400) {
      throw new Error(
        `TaskService createTask failed, HTTP status ${response.status}`
      );
    }
    const apiResponse = await response.json();
    if (response.status === 400) {
      return apiResponse;
    }
    const data = _.get(apiResponse, "data");
    if (!data) {
      throw new Error(`TaskService createTask failed, data not returned`);
    }
    return data;
  }

  async getTask(id) {
    const url = `${constants.API_ENDPOINT}/tasks/${id}/?format=vnd.api%2Bjson`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/vnd.api+json",
        Authorization: `Token ${constants.API_TOKEN}`
      }
    });

    if (!response.ok) {
      throw new Error(
        `TaskService getTask failed, HTTP status ${response.status}`
      );
    }

    const data = await response.json();

    if (!data) {
      throw new Error(`TaskService getTaskList failed, data not returned`);
    }
    return data;
  }
}

export default new TaskService();
