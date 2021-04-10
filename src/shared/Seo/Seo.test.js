import { shallow } from 'enzyme';
import React from 'react';
import Seo from './index';

describe('Seo Component test', () => {
  it('expect to render Seo component', () => {
    expect(shallow(<Seo page="Home" />)).toMatchSnapshot();
  });
});
