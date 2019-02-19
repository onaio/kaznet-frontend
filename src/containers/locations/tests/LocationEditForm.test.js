// Test LocationEditForm
import React from 'react';
import { shallow } from 'enzyme';
import Immutable from 'seamless-immutable';

import * as fixtures from '../../../store/locations/tests/fixtures';
import { LocationEditForm } from '../LocationEditForm';
import FormView from '../../../components/FormView';
import LocationForm from '../LocationForm';
import { locationTypesById } from '../../../store/locationTypes/tests/fixtures';

describe('containers/location/LocationEditForm', () => {
  it('renders without crashing', () => {
    shallow(
      <LocationEditForm
        match={{
          params: {
            id: '1'
          }
        }}
        fetchLocation={function() {}}
        noTitle={function() {}}
      />
    );
  });

  it('renders both Form View and LocationForm with correct Data', () => {
    const wrapper = shallow(
      <LocationEditForm
        match={{
          params: {
            id: '1'
          }
        }}
        fetchLocation={function() {}}
        noTitle={function() {}}
        locationById={fixtures.singleLocation}
        currentLocation={fixtures.singleLocation}
        locationTypesById={locationTypesById}
        locationTypeOptions={Immutable(fixtures.selectOptions)}
      />
    ).dive();

    const expected = {
      geopoint: '',
      location_type: '',
      name: 'Isiolo Market X',
      parent: '',
      radius: '',
      shapefile: ''
    };

    expect(wrapper.find(FormView)).toHaveLength(0);
    expect(wrapper.find(LocationForm)).toHaveLength(1);
    const data = wrapper.find(LocationForm).props().initialData;
    expect(data).toEqual(expected);
  });
});
