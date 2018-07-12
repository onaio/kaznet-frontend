import _ from "lodash";
import { tasksArray } from "../../tasks/tests/fixtures";

export const clientData = {
  links: {
    first: "http://localhost:8000/api/v1/clients/?page=1",
    last: "http://localhost:8000/api/v1/clients/?page=2",
    next: "http://localhost:8000/api/v1/clients/?page=2",
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
      pages: 2,
      count: 2
    }
  }
};

export const clientData2 = {
  links: {
    first: "http://localhost:8000/api/v1/clients/?page=1",
    last: "http://localhost:8000/api/v1/clients/?page=2",
    next: null,
    prev: "http://localhost:8000/api/v1/clients/?page=1"
  },
  data: [
    {
      type: "Client",
      id: "2",
      attributes: {
        name: "Seconder",
        created: "2018-06-21T13:51:54.011373+03:00"
      }
    }
  ],
  meta: {
    pagination: {
      page: 2,
      pages: 2,
      count: 2
    }
  }
};

export const singleClientData = {
  data: {
    type: "Client",
    id: "1",
    attributes: {
      name: "Sol",
      created: "2018-06-21T13:51:54.011373+03:00"
    }
  }
};

export const singleClient = {
  type: "Client",
  id: "1",
  attributes: {
    name: "Sol",
    created: "2018-06-21T13:51:54.011373+03:00"
  }
};

export const clientsArray = _.map(clientData.data, client => {
  return client;
});

export const clientsById = _.keyBy(clientsArray, client => client.id);

export const clientsIdArray = _.keys(clientsById);

export const clientById = _.get(clientsById, 1);
export const pageLinks = clientData.links;
export const totalPages = clientData.meta.pagination.pages;
export const currentPage = clientData.meta.pagination.page;
