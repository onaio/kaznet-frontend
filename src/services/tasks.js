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
    // const data = {
    //   "data": {
    //     "type": "Task",
    //     "id": null,
    //     "attributes": {
    //       "name": "Awful Task",
    //       "estimated_time": "3 2:20:10",
    //       "description": "This is awesome, as tasks go.",
    //       "start": "2018-06-12T17:48:34+03:00",
    //       "end": "2018-12-12T17:48:34+03:00",
    //       "timing_rule": "RRULE:FREQ=DAILY;INTERVAL=10;COUNT=50",
    //       "total_submission_target": 1000,
    //       "user_submission_target": 5,
    //       "status": "d",
    //       "target_id": 1,
    //       "target_content_type": 15,
    //       "client": {
    //         "type": "Client",
    //         "id": "1"
    //       },
    //       "locations": [{
    //         "type": "Location",
    //         "id": "1"
    //       }]
    //     }
    //   }
    // }
    const url = `${constants.API_ENDPOINT}/tasks/`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/vnd.api+json",
        "content-type": "application/vnd.api+json",
        Authorization: `Token ${constants.API_TOKEN}`
      },
      body: JSON.stringify(data),
      cache: "no-cache"
    });
    if (!response.ok) {
      throw new Error(
        `TaskService createTask failed, HTTP status ${response.status}`
      );
    }
    const apiResponse = await response.json();
    const data = _.get(apiResponse, "data");
    if (!data) {
      throw new Error(`TaskService createTask failed, data not returned`);
    }
    return data;
  }
}

export default new TaskService();
