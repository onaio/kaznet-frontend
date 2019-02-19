import React from 'react';
import { shallow, mount } from 'enzyme';
import { Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import { ClientDeletion } from '../ClientDeletion';

const history = createBrowserHistory();

describe('containers/clients/ClientDeletion', () => {
  it('renders without crashing', () => {
    shallow(
      <ClientDeletion
        match={{
          params: {
            id: '4'
          }
        }}
        deleteClient={function() {}}
      />
    );
  });
  it('check if deleteClient works', () => {
    const mockDeleteClient = jest.fn();

    const wrapper = mount(
      <Router history={history}>
        <ClientDeletion
          match={{
            params: {
              id: '4'
            }
          }}
          fetchClient={function() {}}
          deleteClient={mockDeleteClient}
        />
      </Router>
    );
    expect(mockDeleteClient.mock.calls[0][0]).toEqual('4');
    expect(mockDeleteClient.mock.calls.length).toBe(1);
  });
});
