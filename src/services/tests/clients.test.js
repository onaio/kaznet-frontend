import ClientService from '../clients';

import * as fixtures from '../../store/clients/tests/fixtures';

global.fetch = require('jest-fetch-mock');

describe('services/clients', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should fetch clients', async () => {
    const data = fixtures.clientData;
    fetch.mockResponseOnce(JSON.stringify(data));
    const response = await ClientService.getClientList();

    const {
      links,
      meta: {
        pagination: { page, pages, count }
      }
    } = data;

    const expectedResponse = {
      clientArray: fixtures.clientsArray,
      pageLinks: links,
      currentPage: page,
      totalPages: pages,
      totalCount: count
    };

    expect(response).toEqual(expectedResponse);
  });

  it('should fetch clients when passed a url', async () => {
    const data = fixtures.clientDataSecondPage;
    const nextUrl = fixtures.clientData.links.next;
    fetch.mockResponseOnce(JSON.stringify(data));
    const response = await ClientService.getClientList(nextUrl);

    const {
      links,
      meta: {
        pagination: { page, pages, count }
      }
    } = data;

    const expectedResponse = {
      clientArray: fixtures.clientsArraySecondPage,
      pageLinks: links,
      currentPage: page,
      totalPages: pages,
      totalCount: count
    };

    expect(response).toEqual(expectedResponse);
  });

  it('should handle default clients http errors', async () => {
    fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });
    let error;
    try {
      await ClientService.getClientList();
    } catch (e) {
      error = e;
    }
    expect(error).toEqual(new Error('ClientService getClientList failed, HTTP status 500'));
  });

  it('should create a client', async () => {
    const data = fixtures.singleClientData;
    fetch.mockResponseOnce(JSON.stringify(data));
    const response = await ClientService.createClient();
    expect(response).toEqual(fixtures.singleClient);
  });

  it('should handle create client http errors', async () => {
    fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });
    let error;
    try {
      await ClientService.createClient();
    } catch (e) {
      error = e;
    }
    expect(error).toEqual(new Error('ClientService createClient failed, HTTP status 500'));
  });

  it('should edit a client', async () => {
    const data = fixtures.singleClientData;
    fetch.mockResponseOnce(JSON.stringify(data));
    const response = await ClientService.editClient(data, 1);
    expect(response).toEqual(fixtures.singleClient);
  });

  it('should delete a client', async () => {
    fetch.mockResponseOnce('999');
    const response = await ClientService.deleteClient('999');
    expect(response).toEqual('999');
  });

  it('should handle delete client http errors', async () => {
    fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });
    let error;
    try {
      await ClientService.deleteClient('999');
    } catch (e) {
      error = e;
    }
    expect(error).toEqual(new Error('ClientService deleteClient failed, HTTP status 500'));
  });

  it('should handle edit client http errors', async () => {
    fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });
    let error;
    try {
      await ClientService.editClient(fixtures.singleClientData, 1);
    } catch (e) {
      error = e;
    }
    expect(error).toEqual(new Error('ClientService editClient failed, HTTP status 500'));
  });

  it('should fetch client', async () => {
    const data = fixtures.singleClientData;
    fetch.mockResponseOnce(JSON.stringify(data));
    const response = await ClientService.getClient(1);
    expect(response).toEqual(fixtures.singleClient);
  });

  it('should handle fetch client http errors', async () => {
    fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });
    let error;
    try {
      await ClientService.getClient(1);
    } catch (e) {
      error = e;
    }
    expect(error).toEqual(new Error('ClientService getClient failed, HTTP status 500'));
  });
});
