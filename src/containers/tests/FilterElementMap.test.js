// Test FilterElementMap
import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import FilterElementMap from '../FilterElementMap';

describe('containers/FilterElementMap', () => {
  it('renders without crashing', () => {
    const filterFields = {
      filterFields: []
    };
    const isOpenStates = [false];
    const handleChangeFunctions = [function() {}];

    shallow(
      <FilterElementMap
        filterFields={filterFields}
        isOpenStates={isOpenStates}
        handleChangeFunctions={handleChangeFunctions}
        HTMLTag="div"
      />
    );
  });

  it('renders tags correctly', () => {
    const filterFields = {
      filterFields: []
    };
    const isOpenStates = [false];
    const handleChangeFunctions = [() => {}];

    const wrapper = mount(
      <FilterElementMap
        filterFields={filterFields}
        isOpenStates={isOpenStates}
        handleChangeFunctions={handleChangeFunctions}
        HTMLTag="div"
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
