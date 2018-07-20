import _ from "lodash";
import * as types from "./actionTypes";
import userService from "../../services/users";

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

export function changePageNumber(pageNumber) {
  return async (dispatch, getState) => {
    dispatch({ type: types.USER_CHANGE_PAGE, pageNumber });
  };
}
