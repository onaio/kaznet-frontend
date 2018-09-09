import _ from "lodash";
import * as types from "./actionTypes";
import userService from "../../services/users";
import * as errorHandlerTypes from "../errorHandler/actionTypes";

export function fetchUsers(url) {
  return async (dispatch, getState) => {
    try {
      const {
        userArray,
        pageLinks,
        currentPage,
        totalPages
      } = await userService.getUserList(url);
      const usersById = _.keyBy(userArray, user => user.id);
      dispatch({
        type: types.USERS_FETCHED,
        usersById,
        pageLinks,
        currentPage,
        totalPages
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

export function exportUserSubmissions(user_id, from, to) {
  return async (dispatch, getState) => {
    const file = await userService.exportUserSubmissions(user_id, from, to);
    dispatch({ type: types.FILE_EXPORTED, file });
  };
}
