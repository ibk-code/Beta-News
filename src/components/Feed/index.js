import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Feed extends React.Component {
  /**
   * image errror function
   * @param {object} e
   */
  imgError = (e) => {
    e.target.src = './asset/img/dummy.jpg';
  };

  render() {
    const article = this.props.article;
    return (
      <React.Fragment>
        <div className="feed">
          <Link to={`/detail?title=${article.abstract}`}>
            <div className="feed__img">
              <img
                src={article?.img || './asset/img/dummy.jpg'}
                onError={this.imgError}
                alt={article.abstract}
                className="img-fluid"
              />
              <div className="gradient"></div>
              <p className="date">
                Date: {new Date(article.pub_date).toDateString()}
              </p>
            </div>
            <div className="desc">
              <p className="author">
                Author:{' '}
                {article.source === null ? 'Not available' : article.source}
              </p>
              <p className="title">{article.headline.main}</p>
            </div>
          </Link>
        </div>
      </React.Fragment>
    );
  }
}

Feed.propTypes = {
  url: PropTypes.string,
  image: PropTypes.string,
  title: PropTypes.string,
  author: PropTypes.string,
  source: PropTypes.string,
  published_at: PropTypes.string
};

export default Feed;
