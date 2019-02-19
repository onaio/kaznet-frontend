import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import { ClientsList } from '../ClientsList';
import * as fixtures from '../../../store/clients/tests/fixtures';

const history = createBrowserHistory();

describe('containers/clients/ClientsList', () => {
  it('renders without crashing', () => {
    shallow(
      <ClientsList
        fetchClients={function() {}}
        changePageTitle={function() {}}
        changePageTitleButton={function() {}}
        changePageTarget={function() {}}
        showListTitle={function() {}}
        changePageNumber={function() {}}
        location={history.location}
        searchVal={function() {}}
        rowsIdArray={fixtures.clientsIdArray}
      />
    );
  });

  it('renders client list correctly', () => {
    const wrapper = mount(
      <Router history={history}>
        <ClientsList
          fetchClients={function() {}}
          changePageTitle={function() {}}
          changePageTitleButton={function() {}}
          changePageTarget={function() {}}
          showListTitle={function() {}}
          rowsById={fixtures.clientsById}
          rowsIdArray={fixtures.clientsIdArray}
          endpoint="clients"
          pageLinks={fixtures.pageLinks}
          totalPages={fixtures.totalPages}
          currentPage={fixtures.currentPage}
          firstPage={fixtures.firstPage}
          changePageNumber={function() {}}
          lastPage={fixtures.lastPage}
          searchVal={function() {}}
          searchParam={fixtures.searchParam}
          location={history.location}
        />
      </Router>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
