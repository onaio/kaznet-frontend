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
      dispatch({
        type: types.USERS_FETCHED,
        usersById,
        pageLinks,
        currentPage,
        totalPages,
        totalCount
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
        errorMessage: error
      });
    }
  };
}

export function exportUserSubmissions(user_name, user_id, from, to) {
  return async (dispatch, getState) => {
    try {
      const file = await exportService.exportUserSubmissions(
        user_name,
        user_id,
        from,
        to
      );
      dispatch({ type: types.FILE_EXPORTED, file });
    } catch (error) {
      dispatch({
        type: errorHandlerTypes.REQUEST_FAILURE,
        errorMessage: error
      });
    }
  };
}
