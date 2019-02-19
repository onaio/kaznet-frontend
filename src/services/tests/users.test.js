import UserService from '../users';
import * as fixtures from '../../store/users/tests/fixtures';

global.fetch = require('jest-fetch-mock');

describe('services/users', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should fetch users', async () => {
    const data = fixtures.userData;
    fetch.mockResponseOnce(JSON.stringify(data));
    const response = await UserService.getUserList();

    const {
      links,
      meta: {
        pagination: { page, pages, count }
      }
    } = data;

    const expectedResponse = {
      userArray: fixtures.usersArray,
      pageLinks: links,
      currentPage: page,
      totalPages: pages,
      totalCount: count
    };

    expect(response).toEqual(expectedResponse);
  });

  it('should fetch users when passed a url', async () => {
    const data = fixtures.userDataSecondPage;
    const nextUrl = fixtures.userData.links.next;
    fetch.mockResponseOnce(JSON.stringify(data));
    const response = await UserService.getUserList(nextUrl);

    const {
      links,
      meta: {
        pagination: { page, pages, count }
      }
    } = data;

    const expectedResponse = {
      userArray: fixtures.usersArraySecondPage,
      pageLinks: links,
      currentPage: page,
      totalPages: pages,
      totalCount: count
    };

    expect(response).toEqual(expectedResponse);
  });

  it('should handle default users http errors', async () => {
    fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });
    let error;
    try {
      await UserService.getUserList();
    } catch (e) {
      error = e;
    }
    expect(error).toEqual(new Error('UserService getUserList failed, HTTP status 500'));
  });
});
