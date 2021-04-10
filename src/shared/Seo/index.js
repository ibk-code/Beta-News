import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import SkipToContent from '../A11y/SkipToContent';

class Seo extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>{`Beta News- ${this.props.page || 'Home'}`}</title>
          <link
            href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;0,900;1,400;1,600&display=swap"
            rel="stylesheet"
          />
        </Helmet>
        <SkipToContent content="main" />
        {this.props.children}
      </React.Fragment>
    );
  }
}

export default Seo;

Seo.propTypes = {
  page: PropTypes.string,
  children: PropTypes.node
};
