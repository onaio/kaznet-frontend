import _ from "lodash";

import * as constants from "../constants";

class TaskService {
  async getTaskList(
    url = `${constants.API_ENDPOINT}/tasks/?format=vnd.api%2Bjson`
  ) {
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

    const tasksArray = _.map(data, task => {
      return task;
    });

    const pageLinks = apiResponse.links;

    const currentPage = apiResponse.meta.pagination.page;

    return {
      tasksArray: tasksArray,
      pageLinks: pageLinks,
      currentPage: currentPage
    };
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
      throw apiResponse.errors;
    }
    const data = _.get(apiResponse, "data");
    if (!data) {
      throw new Error(`TaskService createTask failed, data not returned`);
    }

    return data;
  }

  async editTask(task_data, id) {
    const url = `${constants.API_ENDPOINT}/tasks/${id}/`;
    const response = await fetch(url, {
      method: "PATCH",
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
        `TaskService editTask failed, HTTP status ${response.status}`
      );
    }

    const apiResponse = await response.json();

    if (response.status === 400) {
      throw apiResponse.errors;
    }

    const data = _.get(apiResponse, "data");
    if (!data) {
      throw new Error("TaskService editTask failed, data not returned");
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

    const apiResponse = await response.json();

    if (response.status === 400) {
      throw apiResponse.errors;
    }

    const data = _.get(apiResponse, "data");
    if (!data) {
      throw new Error("TaskService getTask failed, data not returned");
    }

    return data;
  }
}

export default new TaskService();
