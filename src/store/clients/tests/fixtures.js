import _ from 'lodash';

export const searchParam = '';
export const singleClient = {
  type: 'Client',
  id: '1',
  attributes: {
    name: 'Sol',
    created: '2018-06-21T13:51:54.011373+03:00'
  }
};

export const secondClient = {
  type: 'Client',
  id: '2',
  attributes: {
    name: 'Ya Boi',
    created: '2018-06-21T13:51:54.011373+03:00'
  }
};

export const clientData = {
  links: {
    first: 'http://localhost:8000/api/v1/clients/?search=&page=1',
    last: 'http://localhost:8000/api/v1/clients/?search=&page=2',
    next: 'http://localhost:8000/api/v1/clients/?search=&page=2',
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
    first: 'http://localhost:8000/api/v1/clients/?page=1',
    last: 'http://localhost:8000/api/v1/clients/?page=2',
    next: '',
    prev: 'http://localhost:8000/api/v1/clients/?page=1'
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

export const clientsArray = _.map(clientData.data, client => client);

export const clientsArraySecondPage = _.map(clientDataSecondPage.data, client => client);

export const currentPage = clientData.meta.pagination.page;
export const totalPages = clientData.meta.pagination.pages;
export const totalCount = clientData.meta.pagination.count;
export const pageLinks = clientData.links;
export const firstPage = 1;
export const lastPage = 2;

export const clientsById = _.keyBy(clientsArray, client => client.id);
export const clientsIdArray = _.keys(clientsById);
export const clientById = _.get(clientsById, 1);

export const currentPageSecondPage = clientDataSecondPage.meta.pagination.page;
export const totalPagesSecondPage = clientDataSecondPage.meta.pagination.pages;
export const pageLinksSecondPage = clientDataSecondPage.links;

export const clientsByIdSecondPage = _.keyBy(clientsArraySecondPage, client => client.id);
export const clientsIdArraySecondPage = _.keys(clientsByIdSecondPage);
export const clientByIdSecondPage = _.get(clientsByIdSecondPage, 1);

export const selectOptions = clientsArray.map(d => ({
  value: d.id,
  label: d.attributes.name
}));

export const selectOptionsSecondPage = clientsArraySecondPage.map(d => ({
  value: d.id,
  label: d.attributes.name
}));
