// Test ClientEditForm
import React from 'react';
import { shallow } from 'enzyme';

import { ClientEditForm } from '../ClientEditForm';
import FormView from '../../../components/FormView';
import ClientForm from '../ClientForm';
import * as fixtures from '../../../store/clients/tests/fixtures';

describe('containers/client/ClientEditForm', () => {
  it('renders without crashing', () => {
    shallow(
      <ClientEditForm
        match={{
          params: {
            id: '1'
          }
        }}
        noTitle={function() {}}
        fetchClient={function() {}}
      />
    );
  });

  it('renders both Form View and ClientForm with correct Data', () => {
    const wrapper = shallow(
      <ClientEditForm
        match={{
          params: {
            id: '1'
          }
        }}
        noTitle={function() {}}
        fetchClient={function() {}}
        clientById={fixtures.singleClient}
      />
    ).dive();

    const expected = {
      name: 'Sol'
    };

    expect(wrapper.find(FormView)).toHaveLength(0);
    expect(wrapper.find(ClientForm)).toHaveLength(1);
    const data = wrapper.find(ClientForm).props().initialData;
    expect(data).toEqual(expected);
  });
});
