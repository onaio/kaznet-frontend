// Test ClientCreateForm
import React from 'react';
import { shallow } from 'enzyme';

import { ClientCreateForm } from '../ClientCreateForm';
import FormView from '../../../components/FormView';
import ClientForm from '../ClientForm';

describe('containers/client/ClientCreateForm', () => {
  it('renders without crashing', () => {
    shallow(<ClientCreateForm noTitle={function() {}} />);
  });

  it('renders both Form View and ClientForm', () => {
    const wrapper = shallow(<ClientCreateForm noTitle={function() {}} />).dive();
    expect(wrapper.find(FormView)).toHaveLength(0);
    expect(wrapper.find(ClientForm)).toHaveLength(1);
  });
});
