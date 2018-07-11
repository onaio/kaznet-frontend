import _ from "lodash";

import * as constants from "../constants";

class UserService {
  async getUserList() {
    const url = `${constants.API_ENDPOINT}/userprofiles/?format=vnd.api%2Bjson`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/vnd.api+json",
        Authorization: `Token ${constants.API_TOKEN}`
      }
    });
    if (!response.ok) {
      throw new Error(
        `UserService getUserList failed, HTTP status ${response.status}`
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
      throw new Error(`UserService getUserList failed, data not returned`);
    }
    const userArray = _.map(data, user => {
      return user;
    });

    const pageLinks = apiResponse.links;

    const currentPage = apiResponse.meta.pagination.page;

    return {
      userArray,
      pageLinks: links,
      currentPage: page,
      totalPages: pages
    };
  }
}

export default new UserService();
