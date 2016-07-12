import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './src/App.jsx';
import KeywordGallery from './src/KeywordGallery.jsx';
import Home from './src/Home.jsx';

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="/keyword" component={Home} />
      <Route path="/keyword/:keyword" component={KeywordGallery} />
      <IndexRoute component={Home} />
    </Route>
  </Router>
), document.getElementById('app'));
