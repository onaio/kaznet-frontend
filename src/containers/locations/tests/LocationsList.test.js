import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import { LocationsList } from '../LocationsList';
import * as fixtures from '../../../store/locations/tests/fixtures';

const history = createBrowserHistory();

describe('containers/locations/LocationList', () => {
  it('renders without crashing', () => {
    shallow(
      <LocationsList
        fetchLocations={function() {}}
        changePageTitle={function() {}}
        changePageTarget={function() {}}
        changePageTitleButton={function() {}}
        changePageNumber={function() {}}
        searchVal={function() {}}
        showListTitle={function() {}}
        rowsIdArray={fixtures.locationsIdArray}
        rowsById={fixtures.locationsById}
        location={history.location}
        searchParam=""
      />
    );
  });

  it('renders location list correctly', () => {
    const wrapper = mount(
      <Router history={history}>
        <LocationsList
          fetchLocations={function() {}}
          changePageTitle={function() {}}
          changePageTarget={function() {}}
          changePageTitleButton={function() {}}
          changePageNumber={function() {}}
          searchVal={function() {}}
          showListTitle={function() {}}
          rowsById={fixtures.locationsById}
          rowsIdArray={fixtures.locationsIdArray}
          endpoint="locations"
          pageLinks={fixtures.pageLinks}
          totalPages={fixtures.totalPages}
          currentPage={fixtures.currentPage}
          firstPage={fixtures.firstPage}
          lastPage={fixtures.lastPage}
          location={history.location}
          searchParam=""
        />
      </Router>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
