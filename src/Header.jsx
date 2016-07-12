import React from 'react';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import { browserHistory } from 'react-router';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  handleKeyDown(e) {
    if (e.keyCode === 13) {
      browserHistory.push(`/keyword/${e.target.value}`);
    }
  }
  render() {
    const searchField = <TextField key="box" hintText="search..." onKeyDown={this.handleKeyDown} />;
    return (
      <AppBar
        title="Image gallery"
        iconElementRight={searchField}
      />
    );
  }
}

export default Header;
