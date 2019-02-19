import { Thunk } from 'redux-testkit';

import * as actionTypes from '../actionTypes';
import * as users from '../actions';
import ExportService from '../../../services/exports';
import UserService from '../../../services/users';
import * as fixtures from './fixtures';
import * as errorHandlerTypes from '../../errorHandler/actionTypes';

jest.mock('../../../services/users');
jest.mock('../../../services/exports');

describe('store/users/actions', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should fetch users from server', async () => {
    UserService.getUserList.mockReturnValueOnce({
      userArray: fixtures.usersArray,
      pageLinks: fixtures.pageLinks,
      currentPage: fixtures.currentPage,
      totalPages: fixtures.totalPages,
      totalCount: fixtures.totalCount
    });
    const dispatches = await Thunk(users.fetchUsers).execute();
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({
      type: actionTypes.USERS_FETCHED,
      usersById: fixtures.usersById,
      pageLinks: fixtures.pageLinks,
      currentPage: fixtures.currentPage,
      totalPages: fixtures.totalPages,
      totalCount: fixtures.totalCount
    });
  });

  it('should fetch users given a url', async () => {
    UserService.getUserList.mockReturnValueOnce({
      userArray: fixtures.usersArraySecondPage,
      pageLinks: fixtures.pageLinksSecondPage,
      currentPage: fixtures.currentPageSecondPage,
      totalPages: fixtures.totalPagesSecondPage
    });
    const dispatches = await Thunk(users.fetchUsers).execute(fixtures.pageLinks.next);
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({
      type: actionTypes.USERS_FETCHED,
      usersById: fixtures.usersByIdSecondPage,
      pageLinks: fixtures.pageLinksSecondPage,
      currentPage: fixtures.currentPageSecondPage,
      totalPages: fixtures.totalPagesSecondPage
    });
  });

  it('should change the current page', async () => {
    const dispatches = await Thunk(users.changePageNumber).execute(2);
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({
      type: actionTypes.USER_CHANGE_PAGE,
      pageNumber: 2
    });
  });

  it('should fetch users and print to console on error', async () => {
    UserService.getUserList.mockImplementationOnce(() => {
      throw new Error('oops');
    });
    console.error = jest.fn();
    const dispatches = await Thunk(users.fetchUsers).execute();
    expect(dispatches.length).toBe(0);
    expect(console.error).toHaveBeenCalledWith(Error('oops'));
  });

  it('should create User', async () => {
    UserService.createUser.mockReturnValueOnce(fixtures.userData);
    const dispatches = await Thunk(users.createUser).execute();
    expect(dispatches.length).toBe(2);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({
      type: actionTypes.USER_CREATED,
      userData: fixtures.userData
    });
    expect(dispatches[1].isPlainObject()).toBe(true);
    expect(dispatches[1].getAction()).toEqual({
      type: errorHandlerTypes.REQUEST_SUCCESS
    });
  });

  it('should create user and dispatch on error', async () => {
    UserService.createUser.mockImplementationOnce(() => {
      throw new Error('Wow!');
    });
    const dispatches = await Thunk(users.createUser).execute();
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({
      type: errorHandlerTypes.REQUEST_FAILURE,
      errorMessage: Error('Wow!')
    });
  });

  it('should export user submissions', async () => {
    ExportService.exportSubmissions.mockReturnValueOnce(fixtures.userExport);
    const dispatches = await Thunk(users.exportSubmissions).execute();
    expect(dispatches.length).toBe(2);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({
      type: actionTypes.FILE_EXPORTED,
      file: fixtures.userExport
    });
    expect(dispatches[1].isPlainObject()).toBe(true);
    expect(dispatches[1].getAction()).toEqual({
      type: errorHandlerTypes.REQUEST_SUCCESS
    });
  });

  it('should export a file and dispatch on error', async () => {
    ExportService.exportSubmissions.mockImplementationOnce(() => {
      throw new Error('Wow!');
    });
    const dispatches = await Thunk(users.exportSubmissions).execute();
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({
      type: errorHandlerTypes.REQUEST_FAILURE,
      errorMessage: Error('Wow!')
    });
  });

  it('should edit user', async () => {
    UserService.editUser.mockReturnValueOnce(fixtures.singleUserData);
    const dispatches = await Thunk(users.editUser).execute();
    expect(dispatches.length).toBe(2);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({
      type: errorHandlerTypes.REQUEST_SUCCESS
    });
    expect(dispatches[1].isPlainObject()).toBe(true);
    expect(dispatches[1].getAction()).toEqual({
      type: actionTypes.USER_EDITED,
      userData: fixtures.singleUserData
    });
  });

  it('should edit user and dispatch on error', async () => {
    UserService.editUser.mockImplementationOnce(() => {
      throw new Error('Wow!');
    });
    const dispatches = await Thunk(users.editUser).execute();
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({
      type: errorHandlerTypes.REQUEST_FAILURE,
      errorMessage: Error('Wow!')
    });
  });

  it('should get user', async () => {
    UserService.getUser.mockReturnValueOnce(fixtures.singleUserData);
    const dispatches = await Thunk(users.fetchUser).execute();
    expect(dispatches.length).toBe(2);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({
      type: errorHandlerTypes.REQUEST_SUCCESS
    });
    expect(dispatches[1].isPlainObject()).toBe(true);
    expect(dispatches[1].getAction()).toEqual({
      type: actionTypes.USER_FETCHED,
      userData: fixtures.singleUserData
    });
  });

  it('should get user and dispatch on error', async () => {
    UserService.getUser.mockImplementationOnce(() => {
      throw new Error('Wow!');
    });
    const dispatches = await Thunk(users.fetchUser).execute();
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({
      type: errorHandlerTypes.REQUEST_FAILURE,
      errorMessage: Error('Wow!')
    });
  });

  it('should get currently logged in user', async () => {
    UserService.getLoggedInUser.mockReturnValueOnce({
      data: fixtures.currentLoggedInUserData
    });
    const dispatches = await Thunk(users.fetchLoggedInUser).execute();
    expect(dispatches.length).toBe(2);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({
      type: errorHandlerTypes.REQUEST_SUCCESS
    });
  });

  it('should get currently logged in user and dispatch on error', async () => {
    UserService.getLoggedInUser.mockImplementationOnce(() => {
      throw new Error('Wow!');
    });
    const dispatches = await Thunk(users.fetchLoggedInUser).execute();
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({
      type: errorHandlerTypes.REQUEST_FAILURE,
      errorMessage: Error('Wow!')
    });
  });
});
