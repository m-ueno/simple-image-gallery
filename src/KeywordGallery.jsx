import React from 'react';
import Gallery from 'react-photo-gallery';

export default class KeywordGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = { photoSet: [] };
  }
  componentDidMount() {
    this.fetchImages(this.props.params.keyword);
  }
  componentWillReceiveProps(nextProps) {
    // Calling this.setState() within this function will not trigger an additional render.
    // https://facebook.github.io/react/docs/component-specs.html
    this.fetchImages(nextProps.params.keyword);
  }
  fetchImages(key) {
    const host = process.env.IMAGE_API_HOST;
    let page = this.props.location.query.page;
    if (!page) {
      page = 1;
    }
    const uri = `${host}/keyword?k=${key}&page=${page}`;

    fetch(uri)
      .then(res => res.json())
      .then(json => {
        const photos = json.map(e => ({
          src: e,
        }));
        this.setState({ photoSet: photos });
      })
      .catch(e => {
        console.log('err', e);
      })
      ;
  }
  render() {
    return (
      <Gallery photos={this.state.photoSet} />
    );
  }
}
KeywordGallery.propTypes = {
  params: React.PropTypes.object,
  location: React.PropTypes.object,
};
