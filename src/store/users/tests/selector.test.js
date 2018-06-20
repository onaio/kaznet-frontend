import Immutable from 'seamless-immutable';
import { Selector } from 'redux-testkit';

import * as users from '../reducer';
import * as fixtures from './fixtures'

const emptyState = Immutable({
    users: {
        "usersById": {},
        "usersIdArray": []
    }
});

const fullState = Immutable({
    users: {
        "usersById": fixtures.usersById,
        "usersIdAray": fixtures.usersIdArray
    }
});

describe('store/users/selectors', () => {

    it('should get default users by id wehn empty', () => {
        Selector(users.getUsersById).expect(emptyState).toReturn({});
    });

    it('should get default tasks id array when empty', () => {
        Selector(users.getUsersIdArray).expect(emptyState).toReturn([]);
    });

    it('should get users by id when full', () => {
        Selector(users.getUsersById).expect(fullState).toReturn(fixtures.usersById);
    });

    it('should get users id array when full', () => {
        Selector(users.getUsersIdArray).expect(fullState).toReturn(fixtures.usersIdArray);
    });

});