import _ from "lodash";
import * as types from "./actionTypes";
import userService from "../../services/users";

export function fetchUsers() {
  return async (dispatch, getState) => {
    try {
      const {
        userArray,
        pageLinks,
        currentPage
      } = await userService.getUserList();
      const usersById = _.keyBy(userArray, user => user.id);
      dispatch({
        type: types.USERS_FETCHED,
        usersById,
        pageLinks,
        currentPage
      });
    } catch (error) {
      console.error(error);
    }
  };
}
