import path from 'path';

import React from 'react';
import ReactDOM from 'react-dom';

import KeywordGallery from './keywordGallery.jsx';

// import { Router, Route, IndexRoute, Link, IndexLink, useRouterHistory } from 'react-router';
// import { createHashHistory } from 'history';

class Image extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
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
    return <p>{this.props.keyword.relPath}</p>;
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
    console.log(this.state.keywords);
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

const urlBase = '/assets/';
const imgRelpathList = [
  'ddl/8699_0007.png',
  'ddl/8699_0008.png',
  'ddl/8699_0009.png',
];

const images = imgRelpathList.map(path => ({ src: `${urlBase}/${path}` }));

ReactDOM.render((
  <div>
    <KeywordList />
    <KeywordGallery keyword="ddl" />
  </div>
), document.getElementById('app'));
