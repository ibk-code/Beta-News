import { shallow } from 'enzyme';
import React from 'react';
import SkipToContent from './SkipToContent';

describe('SkipToContent Component test', () => {
  it('expect to render SkipToContent  component', () => {
    expect(shallow(<SkipToContent content="main" />)).toMatchSnapshot();
  });
});
