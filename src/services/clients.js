import _ from "lodash";
import * as constants from "../constants";

class ClientService {
  async getClientList() {
    const url = `${constants.API_ENDPOINT}/clients/?format=vnd.api%2Bjson`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/vnd.api+json",
        Authorization: `Token ${constants.API_TOKEN}`
      }
    });

    if (!response.ok) {
      throw new Error(
        `ClientService getClientList failed, HTTP status ${response.status}`
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
      throw new Error(`ClientService getClientList failed, data not returned`);
    }

    const clientArray = _.map(data, client => {
      return client;
    });

    return {
      clientArray,
      pageLinks: links,
      currentPage: page,
      totalPages: pages
    };
  }

  async createClient(client_data) {
    const url = `${constants.API_ENDPOINT}/clients/`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/vnd.api+json",
        "content-type": "application/vnd.api+json",
        Authorization: `Token ${constants.API_TOKEN}`
      },
      body: JSON.stringify(client_data),
      cache: "no-cache"
    });

    if (!response.ok && response.status !== 400) {
      throw new Error(
        `ClientService createClient failed, HTTP status ${response.status}`
      );
    }

    const apiResponse = await response.json();
    if (response.status === 400) {
      throw apiResponse.errors;
    }
    const data = _.get(apiResponse, "data");

    if (!data) {
      throw new Error(`ClientService createClient failed, data not returned`);
    }
    return data;
  }

  async editClient(client_data, id) {
    const url = `${constants.API_ENDPOINT}/clients/${id}/`;
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        Accept: "application/vnd.api+json",
        "content-type": "application/vnd.api+json",
        Authorization: `Token ${constants.API_TOKEN}`
      },
      body: JSON.stringify(client_data),
      cache: "no-cache"
    });

    if (!response.ok && response.status !== 400) {
      throw new Error(
        `ClientService editClient failed, HTTP status ${response.status}`
      );
    }

    const apiResponse = await response.json();

    if (response.status === 400) {
      throw apiResponse.errors;
    }

    const data = _.get(apiResponse, "data");
    if (!data) {
      throw new Error("ClientService editClient failed, data not returned");
    }

    return data;
  }

  async getClient(id) {
    const url = `${
      constants.API_ENDPOINT
    }/clients/${id}/?format=vnd.api%2Bjson`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/vnd.api+json",
        Authorization: `Token ${constants.API_TOKEN}`
      }
    });

    if (!response.ok) {
      throw new Error(
        `ClientService getClient failed, HTTP status ${response.status}`
      );
    }

    const apiResponse = await response.json();

    if (response.status === 400) {
      throw apiResponse.errors;
    }
    const data = _.get(apiResponse, "data");

    if (!data) {
      throw new Error(`ClientService getClient failed, data not returned`);
    }
    return data;
  }
}

export default new ClientService();
