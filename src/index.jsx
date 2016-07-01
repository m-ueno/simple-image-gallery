import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, useRouterHistory } from 'react-router';
// import { Router, Route, IndexRoute, Link, IndexLink, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { List, ListItem } from 'material-ui/List';
// import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import KeywordGallery from './keywordGallery.jsx';

// import { createHashHistory } from 'history';

injectTapEventPlugin();

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

class KeywordListDrawer extends React.Component {
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
      return <MenuItem><Keyword key={k.id} keyword={k} /></MenuItem>;
    });
    return (
      <Drawer docked open={true}>
        {keywordElems}
      </Drawer>
    );
  }
}

class KeywordListBar extends React.Component {
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
      return <ListItem><Keyword key={k.id} keyword={k} /></ListItem>;
    });
    return (
      <List>
        {keywordElems}
      </List>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
      <MuiThemeProvider>
        <KeywordListBar />
      </MuiThemeProvider>
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
