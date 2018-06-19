// task selector tests
import Immutable from 'seamless-immutable';
import { Selector } from 'redux-testkit';

import * as tasks from '../reducer';
import * as fixtures from './fixtures';

const emptyState = Immutable({
    tasks: {
        "tasksById": {},
        "tasksIdArray": []
    }
});

const fullState = Immutable({
    tasks: {
        "tasksById": fixtures.tasksById,
        "tasksIdArray": fixtures.tasksIdArray
    }
  });

describe('store/tasks/selectors', () => {

    it('should get default tasks by id when empty', () => {
      Selector(tasks.getTasksById).expect(emptyState).toReturn({});
    });

    it('should get default task ids array when empty', () => {
      Selector(tasks.getTasksIdArray).expect(emptyState).toReturn([]);
    });

    it('should get tasks by id when full', () => {
        Selector(tasks.getTasksById).expect(fullState).toReturn(fixtures.tasksById);
    });

    it('should get task ids array when full', () => {
    Selector(tasks.getTasksIdArray).expect(fullState).toReturn(fixtures.tasksIdArray);
    });

});