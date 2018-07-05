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

    const apiResponse = await response.json();
    const data = _.get(apiResponse, "data");

    if (!data) {
      throw new Error(`ClientService getClientList failed, data not returned`);
    }
    return _.map(data, client => {
      return client;
    });
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
      return apiResponse;
    }
    const data = _.get(apiResponse, "data");

    if (!data) {
      throw new Error(`ClientService createData failed, data not returned`);
    }
    return data;
  }
}

export default new ClientService();
