import _ from "lodash";
import * as constants from "../constants";

class formService {
  async getLocationTypeList() {
    const url = `${
      constants.API_ENDPOINT
    }/locationtypes/?format=vnd.api%2Bjson`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/vnd.api+json",
        Authorization: `Token ${constants.API_TOKEN}`
      }
    });

    if (!response.ok) {
      throw new Error(
        `LocationTypeService getLocationTypeList failed, HTTP status ${
          response.status
        }`
      );
    }

    const apiResponse = await response.json();
    const data = _.get(apiResponse, "data");

    if (!data) {
      throw new Error(
        `LocationTypeService getLocationTypeList failed, data not returned`
      );
    }
    return _.map(data, client => {
      return client;
    });
  }
}

export default new formService();
