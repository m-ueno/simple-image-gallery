import React from 'react';
import { Link } from 'react-router';
// import { Link } from 'react-router';

const Home = () => (
  <div>
    <PopularKeywords />
  </div>
);

class PopularKeywords extends React.Component {
  constructor() {
    super();
    this.state = { popularKeywords: ['春', '夏', '秋', '冬',
      'Spring', 'Summer', 'Autumn', 'Winter',
      'Fox', 'Tiger',
    ] };
  }
  render() {
    return (<div>
      <h2>Keywords</h2>
      <Keywords keywords={this.state.popularKeywords} />
    </div>);
  }
}

class Keywords extends React.Component {
  render() {
    return (
      <ul>
      {
        this.props.keywords.map(key => <li><Link to={`/keyword/${key}`}>{key}</Link></li>)
      }
      </ul>
    );
  }
}
Keywords.propTypes = { keywords: React.PropTypes.array.isRequired };

export default Home;
