import _ from "lodash";
import { tasksArray } from "../../tasks/tests/fixtures";

export const singleClient = {
  type: "Client",
  id: "1",
  attributes: {
    name: "Sol",
    created: "2018-06-21T13:51:54.011373+03:00"
  }
};

export const secondClient = {
  type: "Client",
  id: "2",
  attributes: {
    name: "Ya Boi",
    created: "2018-06-21T13:51:54.011373+03:00"
  }
};

export const clientData = {
  links: {
    first: "http://localhost:8000/api/v1/clients/?page=1",
    last: "http://localhost:8000/api/v1/clients/?page=2",
    next: "http://localhost:8000/api/v1/clients/?page=2",
    prev: null
  },
  data: [singleClient],
  meta: {
    pagination: {
      page: 1,
      pages: 2,
      count: 1
    }
  }
};

export const clientDataSecondPage = {
  links: {
    first: "http://localhost:8000/api/v1/clients/?page=1",
    last: "http://localhost:8000/api/v1/clients/?page=2",
    next: "",
    prev: "http://localhost:8000/api/v1/clients/?page=1"
  },
  data: [secondClient],
  meta: {
    pagination: {
      page: 2,
      pages: 2,
      count: 1
    }
  }
};

export const singleClientData = {
  data: singleClient
};

export const clientsArray = _.map(clientData.data, client => {
  return client;
});

export const clientsArraySecondPage = _.map(
  clientDataSecondPage.data,
  client => {
    return client;
  }
);

export const clientsById = _.keyBy(clientsArray, client => client.id);

export const clientsIdArray = _.keys(clientsById);

export const clientById = _.get(clientsById, 1);
