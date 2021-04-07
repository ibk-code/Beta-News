import React, { Component, Fragment } from 'react';

class Skeleton extends Component {
  render() {
    return (
      <Fragment>
        <div className="skeleton-wrap">
          <div className="skeleton-shape"></div>
          <div className="skeleton-shape-long"></div>
          <div className="skeleton-shape-small"></div>
        </div>
      </Fragment>
    );
  }
}

export default Skeleton;
