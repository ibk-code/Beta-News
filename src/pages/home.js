import React from "react";
import Seo from "../components/Seo";
import Navigation from "../components/Navigation/";
import { Container, Row, Col } from "react-bootstrap";
import { categories } from "../utils";
import Feed from "../components/Feed";
import { observer, inject } from "mobx-react";

// @inject("feed")
// @observer
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "All",
    };
  }

  newsCategory = (e) => {
    this.props.feed.getNews(e.target.innerText);
    this.setState({ category: e.target.innerText });
  };

  newsCategoryMobile = (e) => {
    this.props.feed.getNews(e.target.value);
    this.setState({ category: e.target.value });
  };

  componentDidMount() {
    this.props.feed.getNews();
  }
  render() {
    let feed;
    if (this.props.feed.newsFeed.length > 0) {
      feed = this.props.feed.newsFeed.map((e, i) => (
        <Feed
          key={i}
          img={e.urlToImage}
          url={e.title}
          time={e.publishedAt}
          title={e.title}
          author={e.author}
        />
      ));
    } else {
      feed = <p>Could not get feed. Please refresh or check network!</p>;
    }
    return (
      <React.Fragment>
        <Seo page="Home">
          <header>
            <Navigation />
          </header>
          <main id="main">
            <Container>
              <Row>
                <Col md={3}>
                  <div className="category">
                    <h2>Category</h2>
                    <div className="categories">
                      {categories.map((e, i) => (
                        <button
                          key={i}
                          onClick={this.newsCategory}
                          className={`${
                            e === this.state.category ? "orange" : ""
                          } cat_btn`}
                        >
                          {e}
                        </button>
                      ))}
                    </div>
                    <div className="categories-mobile">
                      <select onChange={this.newsCategoryMobile}>
                        {categories.map((e, i) => (
                          <option key={i} value={e}>
                            {e}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </Col>
                <Col md={9}>
                  <div className="pl-3 pr-3">
                    <h2>
                      <b>New</b> Headlines - {this.state.category}
                    </h2>
                    {this.props.feed.loading && (
                      <p className="text-center font-weight-bold">
                        Loading news feed....
                      </p>
                    )}
                    {!this.props.feed.loading && feed}
                  </div>
                </Col>
                {/* <Col md={3}></Col> */}
              </Row>
            </Container>
          </main>
        </Seo>
      </React.Fragment>
    );
  }
}

export default inject("feed")(observer(Home));
// export default Home;
