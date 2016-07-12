import React from 'react';
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Header from './Header.jsx';
import muiTheme from './theme';

injectTapEventPlugin();

export default class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Header />
          <Link to="/">Home</Link>
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}
App.propTypes = { children: React.PropTypes.object };
