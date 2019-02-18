// users store Integration tests
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import * as reducers from '../reducers';
import * as userActions from '../users/actions';
import * as userSelectors from '../users/reducer';
import * as fixtures from '../users/tests/fixtures';
import UserService from '../../services/users';

jest.mock('../../services/users');

describe('store/users', () => {
  let store;

  beforeEach(() => {
    jest.resetAllMocks();
    store = createStore(combineReducers(reducers), applyMiddleware(thunk));
  });

  it('should retrieve all users', async () => {
    UserService.getUserList.mockReturnValueOnce({
      userArray: fixtures.usersArray,
      pageLinks: fixtures.pageLinks,
      currentPage: fixtures.currentPage,
      totalPages: fixtures.totalPages,
      totalCount: fixtures.totalCount
    });

    await store.dispatch(userActions.fetchUsers());
    expect(userSelectors.getUsersById(store.getState())).toEqual(fixtures.usersById);
    expect(userSelectors.getUsersIdArray(store.getState())).toEqual(fixtures.usersIdArray);
  });
});
