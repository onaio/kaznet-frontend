// test UserDeletion
import React from 'react';
import { shallow, mount } from 'enzyme';
import { Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import { UserDeletion } from '../UserDeletion';

const history = createBrowserHistory();

describe('containers/users/UserDeletion', () => {
  it('renders without crashing', () => {
    shallow(
      <UserDeletion
        match={{
          params: {
            id: '4'
          }
        }}
        deleteUser={function() {}}
      />
    );
  });
  it('check if deleteUser works', () => {
    const mockDeleteUser = jest.fn();

    const wrapper = mount(
      <Router history={history}>
        <UserDeletion
          match={{
            params: {
              id: '4'
            }
          }}
          fetchUser={function() {}}
          deleteUser={mockDeleteUser}
        />
      </Router>
    );
    expect(mockDeleteUser.mock.calls[0][0]).toEqual('4');
    expect(mockDeleteUser.mock.calls.length).toBe(1);
  });
});
