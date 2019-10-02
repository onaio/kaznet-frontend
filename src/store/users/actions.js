import _ from 'lodash';
import * as types from './actionTypes';
import userService from '../../services/users';
import exportService from '../../services/exports';
import * as errorHandlerTypes from '../errorHandler/actionTypes';
import * as constants from '../../constants';

export function fetchUsers(url = `${constants.API_ENDPOINT}/userprofiles/`) {
  return async dispatch => {
    try {
      const {
        userArray,
        pageLinks,
        currentPage,
        totalPages,
        totalCount
      } = await userService.getUserList(url);
      const usersById = _.keyBy(userArray, user => user.id);
      const currentUser = await userService.getLoggedInUser();
      dispatch({
        type: types.USERS_FETCHED,
        usersById,
        pageLinks,
        currentPage,
        totalPages,
        totalCount,
        currentUser
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export function createUser(userDataParam) {
  return async dispatch => {
    try {
      const userData = await userService.createUser(userDataParam);
      dispatch({ type: types.USER_CREATED, userData });
      dispatch({ type: errorHandlerTypes.REQUEST_SUCCESS });
    } catch (error) {
      dispatch({
        type: errorHandlerTypes.REQUEST_FAILURE,
        errorMessage: error
      });
    }
  };
}

export function editUser(userDataParam, id) {
  return async dispatch => {
    try {
      const userData = await userService.editUser(userDataParam, id);
      dispatch({
        type: errorHandlerTypes.REQUEST_SUCCESS
      });
      dispatch({
        type: types.USER_EDITED,
        userData
      });
    } catch (error) {
      dispatch({
        type: errorHandlerTypes.REQUEST_FAILURE,
        errorMessage: error
      });
    }
  };
}

// fetch a specific user
export function fetchUser(id) {
  return async dispatch => {
    try {
      const userData = await userService.getUser(id);
      dispatch({
        type: errorHandlerTypes.REQUEST_SUCCESS
      });
      dispatch({
        type: types.USER_FETCHED,
        userData
      });
    } catch (error) {
      dispatch({
        type: errorHandlerTypes.REQUEST_FAILURE,
        errorMessage: error
      });
    }
  };
}

export function changePageNumber(pageNumber) {
  return async dispatch => {
    dispatch({ type: types.USER_CHANGE_PAGE, pageNumber });
  };
}

// delete user
export function deleteUser(userIdParam) {
  return async dispatch => {
    try {
      const userId = await userService.deleteUser(userIdParam);
      dispatch({
        type: errorHandlerTypes.REQUEST_SUCCESS
      });
      dispatch({
        type: types.USER_DELETED,
        userId
      });
    } catch (error) {
      dispatch({
        type: errorHandlerTypes.REQUEST_FAILURE,
        errorMessage: 'User was not deleted'
      });
    }
  };
}

export function exportSubmissions(filterDict, name = null) {
  return async dispatch => {
    try {
      const file = await exportService.exportSubmissions(filterDict, name);
      dispatch({
        type: types.FILE_EXPORTED,
        file
      });
      dispatch({
        type: errorHandlerTypes.REQUEST_SUCCESS
      });
    } catch (error) {
      dispatch({
        type: errorHandlerTypes.REQUEST_FAILURE,
        errorMessage: error
      });
    }
  };
}
// fetch currently logged in user
export function fetchLoggedInUser() {
  return async dispatch => {
    try {
      const userData = await userService.getLoggedInUser();
      dispatch({
        type: errorHandlerTypes.REQUEST_SUCCESS
      });
      dispatch({
        type: types.CURRENT_USER_FETCHED,
        userData
      });
    } catch (error) {
      dispatch({
        type: errorHandlerTypes.REQUEST_FAILURE,
        errorMessage: error
      });
    }
  };
}
