// Test StatisticsSection
import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import StatisticsSection from '../StatisticsSection';
import * as fixtures from '../../../store/tasks/tests/fixtures';

describe('containers/task/StatisticsSection', () => {
  it('renders without crashing', () => {
    shallow(<StatisticsSection />);
  });

  it('renders statistics correctly', () => {
    const task = fixtures.singleTask;
    const wrapper = mount(
      <StatisticsSection
        accepted={task.attributes.approved_submissions_count}
        reward={task.attributes.total_bounty_payout}
        review={task.attributes.pending_submissions_count}
        rejected={task.attributes.rejected_submissions_count}
        totalSubmissions={task.attributes.submission_count}
        task={task}
        formURL="https://ona.io/kaznettest/64730/327942"
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
