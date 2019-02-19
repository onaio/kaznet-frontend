// test LocationDeletion
import React from 'react';
import { shallow, mount } from 'enzyme';
import { Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import { LocationDeletion } from '../LocationDeletion';

const history = createBrowserHistory();

describe('containers/locations/LocationDeletion', () => {
  it('renders without crashing', () => {
    shallow(
      <LocationDeletion
        match={{
          params: {
            id: '4'
          }
        }}
        deleteLocation={function() {}}
      />
    );
  });
  it('check if deleteLocation works', () => {
    const mockDeleteLocation = jest.fn();

    const wrapper = mount(
      <Router history={history}>
        <LocationDeletion
          match={{
            params: {
              id: '4'
            }
          }}
          fetchLocation={function() {}}
          deleteLocation={mockDeleteLocation}
        />
      </Router>
    );
    expect(mockDeleteLocation.mock.calls[0][0]).toEqual('4');
    expect(mockDeleteLocation.mock.calls.length).toBe(1);
  });
});
