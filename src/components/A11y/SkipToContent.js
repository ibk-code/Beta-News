import React from "react";
import PropTypes from "prop-types";

class SkipToContent extends React.Component {
  render() {
    return (
      <a
        className="skip"
        href={"#" + this.props.content}
        aria-label="Skip to main Content"
      >
        Skip to Content
      </a>
    );
  }
}

export default SkipToContent;

SkipToContent.propTypes = {
  content: PropTypes.string,
};
