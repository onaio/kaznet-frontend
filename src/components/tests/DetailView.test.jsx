// Test DetailView
import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import DetailView from '../DetailView';
import NestedElementMap from '../../containers/NestedElementMap';

describe('components/DetailView', () => {
  it('renders without crashing', () => {
    const renderMainDetails = () => {
      const detailItems = {
        Name: 'Dave',
        Test: 'Testing'
      };
      return <NestedElementMap detailitems={detailItems} HTMLTag="td" />;
    };

    const renderAdditionalDetails = () => {
      const detailItems = {
        Gender: 'Male'
      };
      return <NestedElementMap detailitems={detailItems} HTMLTag="td" />;
    };

    shallow(
      <DetailView
        renderMainDetails={renderMainDetails()}
        renderAdditionalDetails={renderAdditionalDetails()}
      />
    );
  });

  it('renders a view', () => {
    const renderMainDetails = () => {
      const detailItems = {
        Name: 'Dave',
        Test: 'Testing'
      };
      return <NestedElementMap detailitems={detailItems} HTMLTag="td" />;
    };

    const renderAdditionalDetails = () => {
      const detailItems = {
        Gender: 'Male'
      };
      return <NestedElementMap detailitems={detailItems} HTMLTag="td" />;
    };

    const wrapper = mount(
      <DetailView
        renderMainDetails={renderMainDetails()}
        renderAdditionalDetails={renderAdditionalDetails()}
      />
    );

    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
