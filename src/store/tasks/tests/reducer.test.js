// task reducer tests
import _ from 'lodash';
import Immutable from 'seamless-immutable';
import { Reducer } from 'redux-testkit';

import tasks from '../reducer';
import * as actionTypes from '../actionTypes';
import * as fixtures from './fixtures';

const initialState = {
    "tasksById": {},
    "tasksIdArray": []
};

describe('store/tasks/reducer', () => {

    it('should have initial state', () => {
      expect(tasks()).toEqual(initialState);
    });

    it('should store fetched tasks', () => {
        const tasksById = fixtures.tasksById;
        const action = {type: actionTypes.TASKS_FETCHED, tasksById};

        const existingState = Immutable(initialState);
        const newState = _.clone(initialState);
        newState.tasksById = tasksById

        Reducer(tasks).withState(existingState).expect(action).toReturnState(newState);
    });

});