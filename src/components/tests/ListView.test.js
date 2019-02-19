// Test ListView
import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import { Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import ErrorBoundary from '../ErrorBoundary';
import ElementMap from '../../containers/ElementMap';
import ListView from '../ListView';
import * as constants from '../../constants';

const history = createBrowserHistory();

describe('components/ListView', () => {
  it('renders without crashing', () => {
    const rowsById = { '0': 'Bob', '1': 'Jane' };
    const rowsIdArray = ['0', '1'];

    const renderHeader = function() {
      const headerItems = ['Name'];

      return <ElementMap items={headerItems} HTMLTag="th" />;
    };

    const renderRow = function(row) {
      const rowItems = [row];
      return <ElementMap items={rowItems} HTMLTag="td" />;
    };
    const endpoint = `${constants.API_ENDPOINT}`;
    const sortField = `${constants.TASK_SORT_ATTRIBUTE}`;
    const sortOrder = `${constants.SORT_DESC}`;
    const currentPage = 1;
    const totalPages = 2;
    const firstPage = 1;
    const lastPage = 2;
    const pageLinks = {
      first: 'http://localhost:8000/api/v1/clients/?page=1',
      last: 'http://localhost:8000/api/v1/clients/?page=2',
      next: 'http://localhost:8000/api/v1/clients/?page=2',
      prev: null
    };

    shallow(
      <Router history={history}>
        <ListView
          endpoint={endpoint}
          renderHeaders={renderHeader}
          rowsIdArray={rowsIdArray}
          rowsById={rowsById}
          renderRow={renderRow}
          firstPage={firstPage}
          lastpage={lastPage}
          pageLinks={pageLinks}
          totalPages={totalPages}
          currentPage={currentPage}
          searchVal="test"
          taskStatus="2"
          sortField={sortField}
          sortOrder={sortOrder}
        />
      </Router>
    );
  });

  it('renders a table', () => {
    const rowsById = { '0': 'Bob', '1': 'Jane' };
    const rowsIdArray = ['0', '1'];

    const renderHeader = function() {
      const headerItems = ['Name'];
      return <ElementMap items={headerItems} HTMLTag="th" />;
    };

    const renderRow = function(row) {
      const rowItems = [row];
      return <ElementMap items={rowItems} HTMLTag="td" />;
    };

    const endpoint = `${constants.API_ENDPOINT}`;
    const currentPage = 1;
    const totalPages = 2;
    const firstPage = 1;
    const lastPage = 2;
    const pageLinks = {
      first: 'http://localhost:8000/api/v1/clients/?page=1',
      last: 'http://localhost:8000/api/v1/clients/?page=2',
      next: 'http://localhost:8000/api/v1/clients/?page=2',
      prev: null
    };

    const wrapper = mount(
      <Router history={history}>
        <ErrorBoundary>
          <ListView
            endpoint={endpoint}
            renderHeaders={renderHeader}
            rowsIdArray={rowsIdArray}
            rowsById={rowsById}
            renderRow={renderRow}
            firstPage={firstPage}
            lastpage={lastPage}
            pageLinks={pageLinks}
            totalPages={totalPages}
            currentPage={currentPage}
            searchVal="test"
            taskStatus="2"
          />
        </ErrorBoundary>
      </Router>
    );

    expect(toJson(wrapper)).toMatchSnapshot();

    wrapper.unmount();
  });

  it('renders pagination when totalPages > 1', () => {
    const rowsById = { '0': 'Bob', '1': 'Jane' };
    const rowsIdArray = ['0', '1'];

    const renderHeader = function() {
      const headerItems = ['Name'];
      return <ElementMap items={headerItems} HTMLTag="th" />;
    };

    const renderRow = function(row) {
      const rowItems = [row];
      return <ElementMap items={rowItems} HTMLTag="td" />;
    };

    const endpoint = `${constants.API_ENDPOINT}`;
    const currentPage = 1;
    const totalPages = 2;
    const firstPage = 1;
    const lastPage = 2;
    const pageLinks = {
      first: 'http://localhost:8000/api/v1/clients/?page=1',
      last: 'http://localhost:8000/api/v1/clients/?page=2',
      next: 'http://localhost:8000/api/v1/clients/?page=2',
      prev: null
    };

    const wrapper = mount(
      <Router history={history}>
        <ListView
          endpoint={endpoint}
          renderHeaders={renderHeader}
          rowsIdArray={rowsIdArray}
          rowsById={rowsById}
          renderRow={renderRow}
          firstPage={firstPage}
          lastpage={lastPage}
          pageLinks={pageLinks}
          totalPages={totalPages}
          currentPage={currentPage}
          searchVal="test"
          taskStatus="2"
        />
      </Router>
    );

    expect(toJson(wrapper)).toMatchSnapshot();

    wrapper.unmount();
  });

  it('does not render pagination when totalPages <= 1', () => {
    const rowsById = { '0': 'Bob', '1': 'Jane' };
    const rowsIdArray = ['0', '1'];

    const renderHeader = function() {
      const headerItems = ['Name'];
      return <ElementMap items={headerItems} HTMLTag="th" />;
    };

    const renderRow = function(row) {
      const rowItems = [row];
      return <ElementMap items={rowItems} HTMLTag="td" />;
    };

    const endpoint = `${constants.API_ENDPOINT}`;
    const currentPage = 1;
    const totalPages = 1;
    const firstPage = 1;
    const lastPage = 1;
    const pageLinks = {
      first: 'http://localhost:8000/api/v1/clients/?page=1',
      last: null,
      next: null,
      prev: null
    };

    const wrapper = mount(
      <Router history={history}>
        <ListView
          endpoint={endpoint}
          renderHeaders={renderHeader}
          rowsIdArray={rowsIdArray}
          rowsById={rowsById}
          renderRow={renderRow}
          firstPage={firstPage}
          lastpage={lastPage}
          pageLinks={pageLinks}
          totalPages={totalPages}
          currentPage={currentPage}
        />
      </Router>
    );

    expect(toJson(wrapper)).toMatchSnapshot();

    wrapper.unmount();
  });
});
