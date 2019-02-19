import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import { LocationTypesList } from '../LocationTypesList';
import * as fixtures from '../../../store/locationTypes/tests/fixtures';

const history = createBrowserHistory();

describe('containers/locationTypes/LocationTypesList', () => {
  it('renders without crashing', () => {
    shallow(
      <LocationTypesList
        fetchLocationTypes={function() {}}
        changePageTitle={function() {}}
        changePageTarget={function() {}}
        changePageTitleButton={function() {}}
        changePageNumber={function() {}}
        searchVal={function() {}}
        showListTitle={function() {}}
        location={history.location}
        rowsIdArray={fixtures.locationTypesIdArray}
      />
    );
  });

  it('renders location list correctly', () => {
    const wrapper = mount(
      <Router history={history}>
        <LocationTypesList
          fetchLocationTypes={function() {}}
          changePageTitle={function() {}}
          changePageTarget={function() {}}
          changePageTitleButton={function() {}}
          changePageNumber={function() {}}
          searchVal={function() {}}
          showListTitle={function() {}}
          rowsById={fixtures.locationTypesById}
          rowsIdArray={fixtures.locationTypesIdArray}
          endpoint="locationTypes"
          pageLinks={fixtures.pageLinks}
          totalPages={fixtures.totalPages}
          currentPage={fixtures.currentPage}
          firstPage={fixtures.firstPage}
          lastPage={fixtures.lastPage}
          location={history.location}
        />
      </Router>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
