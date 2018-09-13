import _ from "lodash";
import * as types from "./actionTypes";
import userService from "../../services/users";
import exportService from "../../services/exports";
import * as errorHandlerTypes from "../errorHandler/actionTypes";

export function fetchUsers(url) {
  return async (dispatch, getState) => {
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

export function createUser(user_data) {
  return async (dispatch, getState) => {
    try {
      const userData = await userService.createUser(user_data);
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

export function changePageNumber(pageNumber) {
  return async (dispatch, getState) => {
    dispatch({ type: types.USER_CHANGE_PAGE, pageNumber });
  };
}
// fetch a specific user
export function fetchUser(id) {
  return async (dispatch, getState) => {
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

// delete user
export function deleteUser(user_id) {
  return async (dispatch, getState) => {
    try {
      const userId = await userService.deleteUser(user_id);
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
        errorMessage: "User was not deleted"
      });
    }
  };
}

export function exportSubmissions(filter_dict, name = null) {
  return async (dispatch, getState) => {
    try {
      const file = await exportService.exportSubmissions(filter_dict, name);
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
// fetch currently loggend in user
export function fetchLoggedInUser() {
  return async (dispatch, getState) => {
    try {
      const userData = await userService.getLoggedInUser();
      dispatch({
        type: errorHandlerTypes.REQUEST_SUCCESS
      });
      dispatch({
        type: types.CURRENT_USER_FETCHTED,
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
