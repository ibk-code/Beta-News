import React, { Suspense, lazy } from 'react';
import './sass/main.scss';
import { Provider } from 'mobx-react';
import feeds from './mobx/NewsStore';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
const HomePage = lazy(() => import('./screens/home'));
const DetailsPage = lazy(() => import('./screens/details'));

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <Suspense fallback={<div>Loading....</div>}>
            <Provider feed={feeds}>
              <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/detail" exact component={DetailsPage} />
              </Switch>
            </Provider>
          </Suspense>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
