// test NoMatch
import React from 'react';
import { shallow } from 'enzyme';
import NoMatch from '../NoMatch';

describe('components/NoMatch', () => {
  it('renders without crashing', () => {
    shallow(<NoMatch />);
  });

  it('renders the 404 message', () => {
    const wrapper = shallow(<NoMatch />);
    const expected = '404!!';
    expect(wrapper.contains(expected)).toEqual(true);
  });
});
