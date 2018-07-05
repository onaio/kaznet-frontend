import _ from "lodash";
import { tasksArray } from "../../tasks/tests/fixtures";

export const clientData = {
  links: {
    first: "http://localhost:8000/api/v1/clients/?page=1",
    last: "http://localhost:8000/api/v1/clients/?page=1",
    next: null,
    prev: null
  },
  data: [
    {
      type: "Client",
      id: "1",
      attributes: {
        name: "Sol",
        created: "2018-06-21T13:51:54.011373+03:00"
      }
    }
  ],
  meta: {
    pagination: {
      page: 1,
      pages: 1,
      count: 1
    }
  }
};

export const singleClientData = {
  data: {
    type: "Client",
    id: "1",
    attributes: {
      name: "Client1"
    }
  }
};

export const singleClient = {
  type: "Client",
  id: "1",
  attributes: {
    name: "Client1"
  }
};

export const clientsArray = _.map(clientData.data, client => {
  return client;
});

export const clientsById = _.keyBy(clientsArray, client => client.id);

export const clientsIdArray = _.keys(clientsById);

export const clientById = _.get(clientsById, 1);
