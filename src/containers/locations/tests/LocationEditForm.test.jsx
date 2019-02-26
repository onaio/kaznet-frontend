// Test LocationEditForm
import React from 'react';
import { shallow } from 'enzyme';
import Immutable from 'seamless-immutable';

import * as fixtures from '../../../store/locations/tests/fixtures';
import { LocationEditForm } from '../LocationEditForm';
import FormView from '../../../components/FormView';
import ConnectedLocationForm from '../LocationForm';
import { locationTypesById } from '../../../store/locationTypes/tests/fixtures';

function emptyFunction() {}

describe('containers/location/LocationEditForm', () => {
  it('renders without crashing', () => {
    shallow(
      <LocationEditForm
        match={{
          params: {
            id: '1'
          }
        }}
        fetchLocation={emptyFunction}
        noTitle={emptyFunction}
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
        fetchLocation={emptyFunction}
        noTitle={emptyFunction}
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
      description: 'Something',
      parent: '',
      radius: '',
      shapefile: ''
    };

    expect(wrapper.find(FormView)).toHaveLength(0);
    expect(wrapper.find(ConnectedLocationForm)).toHaveLength(1);
    const data = wrapper.find(ConnectedLocationForm).props().initialData;
    expect(data).toEqual(expected);
  });
});
