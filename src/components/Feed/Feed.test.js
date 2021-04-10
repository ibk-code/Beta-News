import { shallow } from 'enzyme';
import React from 'react';
import Feed from './index';

describe('Feed Component test', () => {
  it('expect to render feed component', () => {
    const article = {
      title: 'Test Article',
      image:
        'https://cdn.cnn.com/cnnnext/dam/assets/210112041400-02-ireland-covid-0106-super-169.jpg',
      url: 'http://rss.cnn.com/~r/rss/edition_europe/~3/3a_KseS2B9A/index.html',
      author: 'ibk-code',
      source: 'cnn',
      published_at: '2021-01-13T07:10:15+00:00'
    };

    expect(shallow(<Feed article={article} />)).toMatchSnapshot();
  });
});
