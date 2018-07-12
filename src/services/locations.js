import _ from "lodash";
import * as constants from "../constants";

class LocationService {
  async getLocationList(
    url = `${constants.API_ENDPOINT}/locations/?format=vnd.api%2Bjson`
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
        `LocationService getLocationList failed, HTTP status ${response.status}`
      );
    }

    const {
      data,
      links,
      meta: {
        pagination: { page, pages }
      }
    } = await response.json();

    if (!data) {
      throw new Error(
        `LocationService getLocationList failed, data not returned`
      );
    }

    const locationArray = _.map(data, location => {
      return location;
    });

    return {
      locationArray,
      pageLinks: links,
      currentPage: page,
      totalPages: pages
    };
  }
}

export default new LocationService();
