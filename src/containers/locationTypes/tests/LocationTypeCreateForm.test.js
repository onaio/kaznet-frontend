// Test LocationTypeCreateForm
import React from 'react';
import { shallow } from 'enzyme';

import { LocationTypeCreateForm } from '../LocationTypeCreateForm';
import FormView from '../../../components/FormView';
import LocationTypeForm from '../LocationTypeForm';

describe('containers/locationType/LocationTypeCreateForm', () => {
  it('renders without crashing', () => {
    shallow(<LocationTypeCreateForm noTitle={function() {}} />);
  });

  it('renders both Form View and LocationTypeForm', () => {
    const wrapper = shallow(<LocationTypeCreateForm noTitle={function() {}} />).dive();
    expect(wrapper.find(FormView)).toHaveLength(0);
    expect(wrapper.find(LocationTypeForm)).toHaveLength(1);
  });
});
