import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import moment from 'moment-timezone';

import { FormsList } from '../FormsList';
import * as fixtures from '../../../store/forms/tests/fixtures';

const history = createBrowserHistory();

function emptyFunction() {}

describe('containers/forms/FormsList', () => {
  it('renders without crashing', () => {
    shallow(
      <FormsList
        fetchForms={emptyFunction}
        getHasTask={emptyFunction}
        changePageTitle={emptyFunction}
        changePageTitleButton={emptyFunction}
        changePageTarget={emptyFunction}
        showListTitle={emptyFunction}
        changePageNumber={emptyFunction}
        location={history.location}
        searchVal={emptyFunction}
        rowsIdArray={fixtures.formsIdArray}
        rowsById={fixtures.formsById}
        searchParam=""
        hasTask=""
        pageLinks={fixtures.pageLinks}
      />
    );
  });

  it('renders form list correctly', () => {
    moment.tz.setDefault('UTC');
    const div = document.createElement('div');
    document.body.appendChild(div);
    const wrapper = mount(
      <Router history={history}>
        <FormsList
          fetchForms={emptyFunction}
          getHasTask={emptyFunction}
          changePageTitle={emptyFunction}
          changePageTitleButton={emptyFunction}
          changePageTarget={emptyFunction}
          showListTitle={emptyFunction}
          rowsById={fixtures.formsById}
          rowsIdArray={fixtures.formsIdArray}
          endpoint="forms"
          pageLinks={fixtures.pageLinks}
          totalPages={fixtures.totalPages}
          currentPage={fixtures.currentPage}
          firstPage={fixtures.firstPage}
          changePageNumber={emptyFunction}
          lastPage={fixtures.lastPage}
          searchVal={emptyFunction}
          searchParam=""
          hasTask=""
          location={history.location}
        />
      </Router>,
      { attachTo: div }
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });

  it('renders form list correctly when there is a has_task filter', () => {
    moment.tz.setDefault('UTC');
    const div = document.createElement('div');
    document.body.appendChild(div);
    const wrapper = mount(
      <Router history={history}>
        <FormsList
          fetchForms={emptyFunction}
          getHasTask={emptyFunction}
          changePageTitle={emptyFunction}
          changePageTitleButton={emptyFunction}
          changePageTarget={emptyFunction}
          showListTitle={emptyFunction}
          rowsById={fixtures.formsById}
          rowsIdArray={fixtures.formsIdArray}
          endpoint="forms"
          pageLinks={fixtures.pageLinks}
          totalPages={fixtures.totalPages}
          currentPage={fixtures.currentPage}
          firstPage={fixtures.firstPage}
          changePageNumber={emptyFunction}
          lastPage={fixtures.lastPage}
          searchVal={emptyFunction}
          searchParam=""
          hasTask=""
          location={history.location}
        />
      </Router>,
      { attachTo: div }
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
