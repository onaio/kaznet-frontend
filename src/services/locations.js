import _ from "lodash";
import * as constants from "../constants";

class LocationService {
  async getLocationList() {
    const url = `${constants.API_ENDPOINT}/locations/?format=vnd.api%2Bjson`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/vnd.api+json",
        Authorization: `Token ${constants.API_TOKEN}`
      }
    });

    if (!response.ok) {
      throw new Error(
        `LocationService getLocationList failed, HTTP status ${response.status}`
      );
    }

    const apiResponse = await response.json();
    const data = _.get(apiResponse, "data");
    if (!data) {
      throw new Error(
        `LocationService getLocationList failed, data not returned`
      );
    }

    return _.map(data, location => {
      return location;
    });
  }
}

export default new LocationService();
