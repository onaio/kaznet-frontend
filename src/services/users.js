import _ from "lodash";

import * as constants from "../constants";

class UserService {
  async getUserList(url = `${constants.API_ENDPOINT}/userprofiles/`) {
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
    const userArray = _.map(data, user => user);

    return {
      userArray,
      pageLinks: links,
      currentPage: page,
      totalPages: pages
    };
  }

  async createUser(user_data) {
    const url = `${constants.API_ENDPOINT}/userprofiles/`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/vnd.api+json",
        "content-type": "application/vnd.api+json",
        Authorization: `Token ${constants.API_TOKEN}`
      },
      body: JSON.stringify(user_data),
      cache: "no-cache"
    });

    if (!response.ok && response.status !== 400) {
      throw new Error(
        `UserService createUser failed, HTTP status ${response.status}`
      );
    }

    const apiResponse = await response.json();

    if (response.status === 400) {
      throw apiResponse.errors;
    }

    const data = _.get(apiResponse, "data");

    if (!data) {
      throw new Error(`UserService createUser failed, data not returned`);
    }

    return data;
  }

  async exportUserSubmissions(user_id, from, to) {
    const url = `${
      constants.API_ENDPOINT
    }/exports/submissions/?user=${user_id}&modified__gte=${from}&modified__lte=${to}&format=csv`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Token ${constants.API_TOKEN}`
      }
    });

    return (window.location.href = response.url);
  }
}

export default new UserService();
