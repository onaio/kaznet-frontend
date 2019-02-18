// Test LocationTypeEditForm
import React from 'react';
import { shallow } from 'enzyme';

import FormView from '../../../components/FormView';
import LocationTypeForm from '../LocationTypeForm';
import { LocationTypeEditForm } from '../LocationTypeEditForm';
import * as fixtures from '../../../store/locationTypes/tests/fixtures';

describe('containers/locationType/LocationTypeEditForm', () => {
  it('renders without crashing', () => {
    shallow(
      <LocationTypeEditForm
        match={{
          params: {
            id: '999'
          }
        }}
        noTitle={function() {}}
        fetchLocationType={function() {}}
      />
    );
  });

  it('renders both Form View and LocationTypeForm with correct Data', () => {
    const wrapper = shallow(
      <LocationTypeEditForm
        match={{
          params: {
            id: '999'
          }
        }}
        noTitle={function() {}}
        fetchLocationType={function() {}}
        locationTypeById={fixtures.singleLocationType}
      />
    ).dive();

    const expected = {
      name: 'Office'
    };

    expect(wrapper.find(FormView)).toHaveLength(0);
    expect(wrapper.find(LocationTypeForm)).toHaveLength(1);
    const data = wrapper.find(LocationTypeForm).props().initialData;
    expect(data).toEqual(expected);
  });
});
