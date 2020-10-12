import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

class Navigation extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="nav-wrap shadow">
          <Container>
            <h1>
              <Link to="/" className="orange">
                A.M<small>News</small>
              </Link>
            </h1>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default Navigation;
