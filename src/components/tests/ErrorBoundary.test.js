// Test Erroroundary
import React from 'react';
import { shallow } from 'enzyme';
import ErrorBoundary from '../ErrorBoundary';

describe('components/ErrorBoundary', () => {
  it('renders without crashing', () => {
    shallow(<ErrorBoundary />);
  });
});
