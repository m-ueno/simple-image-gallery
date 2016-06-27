import React from 'react';
import ReactDOM from 'react-dom';
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

const urlBase = '/assets/';
const imgRelpathList = [
  'ddl/8699_0007.png',
  'ddl/8699_0008.png',
  'ddl/8699_0009.png',
];

const images = imgRelpathList.map(path => ({ src: `${urlBase}/${path}` }));

ReactDOM.render((
  <ImageList images={images} />
), document.getElementById('app'));
