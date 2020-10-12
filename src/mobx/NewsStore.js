import { observable, action, autorun, makeObservable } from "mobx";
import axios from "axios";

class News {
  newsFeed = [];
  singleFeed = {};
  loading = false;

  constructor() {
    makeObservable(this, {
      newsFeed: observable,
      singleFeed: observable,
      loading: observable,
      getSingleFeed: action,
      getNews: action,
    });
    autorun(() => {
      console.log(this.newsFeed);
    });
  }

  getSingleFeed = (title) => {
    const articles = JSON.parse(sessionStorage.getItem("article"));
    this.singleFeed = articles.find((e) => {
      return e.title === title;
    });
  };

  sortedNews = (data) => {
    return data.filter((e) => {
      return e.content !== null;
    });
  };

  getNews = async (category = "all") => {
    const tranCategory = category.toLowerCase();
    try {
      this.loading = true;
      let response;
      const all_url =
        "http://newsapi.org/v2/top-headlines?country=ng&apiKey=216e6236cd1d4ae3afe99ee30c2179c9";

      const category_url = `http://newsapi.org/v2/top-headlines?country=ng&category=${tranCategory}&apiKey=216e6236cd1d4ae3afe99ee30c2179c9`;

      if (tranCategory === "all") {
        response = await axios.get(all_url);
      } else {
        response = await axios.get(category_url);
      }
      this.newsFeed = this.sortedNews(response.data.articles);
      sessionStorage.setItem(
        "article",
        JSON.stringify(this.sortedNews(response.data.articles))
      );
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.newsFeed = [];
      return "Error occured";
    }
  };
}

let feeds = new News();
window.feeds = feeds;

export default feeds;
