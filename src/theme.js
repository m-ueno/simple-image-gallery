import {
  pink500, pink700,
  limeA200,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';

import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
  // fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: pink500,
    primary2Color: pink700,
    primary3Color: grey400,
    accent1Color: limeA200,
    accent2Color: grey100,
    accent3Color: grey500,
    // primary1Color: cyan500,
    // primary2Color: cyan700,
    // primary3Color: grey400,
    // accent1Color: pinkA200,
    // accent2Color: grey100,
    // accent3Color: grey500,
    textColor: darkBlack,
    // secondaryTextColor: fade(darkBlack, 0.54),
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    // disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: pink500,
    // clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  },
});

export default muiTheme;
