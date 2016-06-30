import React from 'react';
import Gallery from 'react-photo-gallery';

export default class KeywordGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = { photoSet: [], keyword: '' };
  }
  componentDidMount() {
    this.fetchImages();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.params.keyword !== this.state.keyword) {
      this.setState({ keyword: nextProps.params.keyword });
      this.fetchImages();
    }
  }
  fetchImages() {
    const url = `/public/images/${this.state.keyword}/list.json`;
    const urlBase = '/public/images';
    fetch(url)
      .then(res => res.json())
      .then(json => {
        const photos = json.map(e => ({ src: `${urlBase}/${e.relPath}` }));
        this.setState({ photoSet: photos });
      })
      .catch(e => {
        throw new Error(e);
      })
      ;
  }
  render() {
    return (
      <Gallery photos={this.state.photoSet} />
    );
  }
}
KeywordGallery.propTypes = { params: React.PropTypes.object };
