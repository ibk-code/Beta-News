import { shallow } from 'enzyme';
import React from 'react';
import Navigation from './index';

describe('Navigation Component test', () => {
  it('expect to render Navigation  component', () => {
    expect(shallow(<Navigation />)).toMatchSnapshot();
  });
});
