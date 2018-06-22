import { Thunk } from 'redux-testkit';

import * as actionTypes from '../actionTypes';
import * as users from '../actions';
import UserService from '../../../services/users';
import * as fixtures from './fixtures'

jest.mock('../../../services/users');

describe('store/users/actions', () => {

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should fetch users from server', async () => {
        UserService.getUserList.mockReturnValueOnce(fixtures.usersArray);
        const dispatches = await Thunk(users.fetchUsers).execute();
        expect(dispatches.length).toBe(1);
        expect(dispatches[0].isPlainObject()).toBe(true);
        expect(dispatches[0].getAction()).toEqual({
            type: actionTypes.USERS_FETCHED, usersById: fixtures.usersById
        });
    });

    it('should fetch users and print to console on error', async () => {
        UserService.getUserList.mockImplementationOnce( () => { throw new Error('oops'); });
        console.error = jest.fn();
        const dispatches = await Thunk(users.fetchUsers).execute();
        expect(dispatches.length).toBe(0);
        expect(console.error).toHaveBeenCalledWith(Error('oops'));
    });

});