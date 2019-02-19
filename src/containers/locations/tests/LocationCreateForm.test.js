// Test LocationCreation
import React from 'react';
import { shallow } from 'enzyme';

import { LocationCreateForm } from '../LocationCreateForm';
import FormView from '../../../components/FormView';
import LocationForm from '../LocationForm';

describe('containers/location/LocationCreateForm', () => {
  it('renders without crashing', () => {
    shallow(<LocationCreateForm noTitle={function() {}} />);
  });

  it('renders both Form View and LocationForm with correct Data', () => {
    const initialData = {
      name: '',
      parent: '',
      location_type: '',
      geopoint: '',
      radius: '',
      shapefile: ''
    };
    const wrapper = shallow(<LocationCreateForm noTitle={function() {}} />).dive();
    expect(wrapper.find(FormView)).toHaveLength(0);
    expect(wrapper.find(LocationForm)).toHaveLength(1);
    const data = wrapper.find(LocationForm).props().initialData;
    expect(data).toEqual(initialData);
  });
});
