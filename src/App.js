import React, { Suspense, lazy } from "react";
import "./sass/main.scss";
import { Provider } from "mobx-react";
import feeds from "./mobx/NewsStore";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
const Home = lazy(() => import("./pages/home"));
const Details = lazy(() => import("./pages/details"));

// let feeds = new News();

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <Suspense fallback={<div>Loading....</div>}>
            <Provider feed={feeds}>
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/detail" exact component={Details} />
              </Switch>
            </Provider>
          </Suspense>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
