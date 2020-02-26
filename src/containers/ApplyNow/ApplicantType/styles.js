import { StyleSheet } from 'react-native';

import {
  BUTTON_COLOR,
  WHITE_COLOR,
  BLACK_COLOR,
  TITLE_COLOR,
  APP_COLOR,
  THEME_CANADA,
} from '../../../constants';

export const styles = StyleSheet.create({
  screenContainer: {
    margin: 10,
  },
  contentContainer: {
    margin: 10,
    flexDirection: 'column',
    alignItems: 'center',
  },
  heading: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  secondaryColor: {
    color: APP_COLOR,
  },
  themeCanada: {
    color: THEME_CANADA,
  },
  themeAmerica: {
    color: APP_COLOR,
  },
  primaryColor: {
    color: TITLE_COLOR,
  },
  btnStyle: {
    margin: 10,
    width: 150,
    height: 50,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: WHITE_COLOR,
    borderColor: BLACK_COLOR,
    borderWidth: 1,
  },
  btnAmerica: {
    borderColor: BUTTON_COLOR,
    backgroundColor: BUTTON_COLOR,
  },
  btnCanada: {
    borderColor: THEME_CANADA,
    backgroundColor: THEME_CANADA,
  },
  btnText: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: BLACK_COLOR,
  },
  selectedBtnText: {
    color: WHITE_COLOR,
  },
});

export default styles;
