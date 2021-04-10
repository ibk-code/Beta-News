import { observable, action, autorun, makeObservable } from 'mobx';
import axios from 'axios';

class News {
  @observable newsFeed = [];
  @observable singleFeed = {};
  @observable loading = false;

  constructor() {
    makeObservable(this);
  }

  /**
   * Get a single news full details
   * @param {string} title
   */
  @action
  getSingleFeed = (title) => {
    const news = JSON.parse(sessionStorage.getItem('news'));
    this.singleFeed = news.find((e) => {
      return e.abstract === title;
    });
    console.log(this.singleFeed);
  };

  /**
   * filter array of news to be filtered
   * @param {array}
   * @returns array
   */
  sortedNews = (data) => {
    return data.filter((e) => {
      return e.title !== null;
    });
  };

  /**
   * Load all news for the site
   * @param {category} string
   */
  @action
  getNews = async (category = 'general') => {
    const tranCategory = category.toLowerCase();
    try {
      this.loading = true;
      let response;
      const all_url =
        'https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=RPQupbRhsRgUAKURH6APjwfXr8EGCoeN';

      const category_url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=RPQupbRhsRgUAKURH6APjwfXr8EGCoeN&q=${tranCategory}`;

      if (tranCategory === 'general') {
        response = await axios.get(all_url);
        console.log(response.data.response.docs);
      } else {
        response = await axios.get(category_url);
      }
      this.newsFeed = this.sortedNews(response.data.response.docs);
      this.newsFeed.forEach((e, i) => {
        e.img = `https://www.nytimes.com/${e.multimedia[9].url}`;
        delete e.multimedia;
      });
      sessionStorage.setItem(
        'news',
        JSON.stringify(this.sortedNews(this.newsFeed))
      );
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.newsFeed = [];
      return 'Error occured';
    }
  };
}

let feeds = new News();
window.feeds = feeds;

autorun(() => {
  console.log(feeds.newsFeed);
});

export default feeds;
