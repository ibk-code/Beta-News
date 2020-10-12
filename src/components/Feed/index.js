import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class Feed extends React.Component {
  imgError = (e) => {
    e.target.src = "./asset/img/dummy.jpg";
  };
  render() {
    return (
      <React.Fragment>
        <div className="feed">
          <Link to={`/detail?title=${this.props.title}`}>
            <div className="feed__img">
              <img
                src={this.props.img || "./asset/img/dummy.jpg"}
                onError={this.imgError}
                alt={this.props.title}
                className="img-fluid"
              />
              <div className="gradient"></div>
              <p className="date">
                Date: {new Date(this.props.time).toDateString()}
              </p>
            </div>
            <div className="desc">
              <p className="author">
                Author:{" "}
                {this.props.author === null
                  ? "Not available"
                  : this.props.author}
              </p>
              <p className="title">{this.props.title}</p>
            </div>
          </Link>
        </div>
      </React.Fragment>
    );
  }
}

Feed.propTypes = {
  url: PropTypes.string.isRequired,
  img: PropTypes.string,
  title: PropTypes.string.isRequired,
  author: PropTypes.string,
};

export default Feed;
