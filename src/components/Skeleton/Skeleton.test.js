import { shallow } from 'enzyme';
import React from 'react';
import Skeleton from './index';

describe('Skeleton Component test', () => {
  it('expect to render skeleton component', () => {
    expect(shallow(<Skeleton />)).toMatchSnapshot();
  });
});
