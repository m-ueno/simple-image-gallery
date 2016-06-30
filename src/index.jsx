import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, useRouterHistory } from 'react-router';
// import { Router, Route, IndexRoute, Link, IndexLink, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';

import KeywordGallery from './keywordGallery.jsx';

// import { createHashHistory } from 'history';

class Image extends React.Component {
  render() {
    return (
      /* {...this.props} :
          https://facebook.github.io/react/docs/reusable-components.html#transferring-props-a-shortcut */
      // <img role="presentation" {...this.props} />
      <img role="presentation" src={this.props.src} />
    );
  }
}
Image.propTypes = { src: React.PropTypes.string.isRequired };

class ImageList extends React.Component {
  render() {
    let imageElems = this.props.images.map(imgObj => {
      let src = imgObj.src;
      return <Image key={src} src={src} />;
    });

    return (
      <div>
        {imageElems}
      </div>
    );
  }
}
ImageList.propTypes = { images: React.PropTypes.arrayOf(React.PropTypes.string).isRequired };

class Keyword extends React.Component {
  render() {
    return (
      <p><Link to={`/keyword${this.props.keyword.relPath}`}>
        {this.props.keyword.relPath}
      </Link></p>
    );
  }
}
Keyword.propTypes = { keyword: React.PropTypes.object };

class KeywordList extends React.Component {
  constructor() {
    super();
    this.state = { keywords: [] };
  }
  componentDidMount() {
    const url = '/public/images/list.json';
    fetch(url)
      .then(res => res.json())
      .then(json => {
        this.setState({ keywords: json });
        console.log(this.state.keywords);
      })
      .catch(e => {
        throw new Error(e);
      })
      ;
  }
  render() {
    const keywordElems = this.state.keywords.map(k => {
      return <Keyword key={k.id} keyword={k} />;
    });
    return (
      <div className="keywordList">
        {keywordElems}
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <KeywordList />
        {this.props.children}
      </div>
    );
  }
}

ReactDOM.render((
  <Router history={useRouterHistory(createHashHistory)({ queryKey: false })}>
    <Route path="/" component={App}>
      <Route path="/keyword/:keyword" component={KeywordGallery} />
    </Route>
  </Router>
), document.getElementById('app'));
