import React, { Component, Fragment } from 'react';

class Skeleton extends Component {
  render() {
    return (
      <Fragment>
        <div className="skeleton-wrap mb-4">
          <div className="skeleton-shape"></div>
          <div className="skeleton-shape-long mt-4"></div>
          <div className="skeleton-shape-small mt-3"></div>
        </div>
      </Fragment>
    );
  }
}

export default Skeleton;
