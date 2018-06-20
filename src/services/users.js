import _ from "lodash";

import * as constants from "../constants";

class UserService {
  async getUserList() {
    const url = `${constants.API_ENDPOINT}/userprofiles/?format=vnd.api%2Bjson`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/vnd.api+json",
        Authorization: `Token b4dfde6232d8f696713a7fde59e8f05ecfded42d`
      }
    });
    if (!response.ok) {
      throw new Error(
        `UserService getUserList failed, HTTP status ${response.status}`
      );
    }
    const apiResponse = await response.json();
    const data = _.get(apiResponse, "data");
    if (!data) {
      throw new Error(`UserService getUserList failed, data not returned`);
    }
    return _.map(data, user => {
      return user;
    });
  }
}

export default new UserService();
