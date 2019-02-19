import React from 'react';
import { shallow, mount } from 'enzyme';
import { Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import { LocationTypeDeletion } from '../LocationTypeDeletion';

const history = createBrowserHistory();

describe('containers/locationTypes/LocationTypeDeletion', () => {
  it('renders without crashing', () => {
    shallow(
      <LocationTypeDeletion
        match={{
          params: {
            id: '4'
          }
        }}
        deleteLocationType={function() {}}
      />
    );
  });
  it('check if deleteLocationType works', () => {
    const mockDeleteLocationType = jest.fn();

    const wrapper = mount(
      <Router history={history}>
        <LocationTypeDeletion
          match={{
            params: {
              id: '4'
            }
          }}
          fetchLocationType={function() {}}
          deleteLocationType={mockDeleteLocationType}
        />
      </Router>
    );
    expect(mockDeleteLocationType.mock.calls[0][0]).toEqual('4');
    expect(mockDeleteLocationType.mock.calls.length).toBe(1);
  });
});
