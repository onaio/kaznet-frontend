import _ from "lodash";
import * as constants from "../constants";

class formService {
  async getFormList(url = `${constants.API_ENDPOINT}/forms/`) {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/vnd.api+json",
        Authorization: `Token ${constants.API_TOKEN}`
      }
    });

    if (!response.ok) {
      throw new Error(
        `FormService getFormList failed, HTTP status ${response.status}`
      );
    }

    const apiResponse = await response.json();
    const data = _.get(apiResponse, "data");

    if (!data) {
      throw new Error(`FormService getFormList failed, data not returned`);
    }
    return _.map(data, client => {
      return client;
    });
  }
}

export default new formService();
