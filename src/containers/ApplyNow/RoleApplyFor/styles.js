import { StyleSheet } from 'react-native';

import { BUTTON_COLOR, WHITE_COLOR, BLACK_COLOR, THEME_CANADA } from '../../../constants';

export const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: WHITE_COLOR,
    justifyContent: 'center',
    height: 50,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: BLACK_COLOR,
  },
  btnText: {
    fontSize: 20,
    textTransform: 'uppercase',
    marginLeft: 10,
    fontWeight: 'bold',
    color: BLACK_COLOR,
  },
  selectedBtnStyle: {
    borderColor: BUTTON_COLOR,
    backgroundColor: BUTTON_COLOR,
  },
  btnAmerica: {
    borderColor: BUTTON_COLOR,
    backgroundColor: BUTTON_COLOR,
  },
  btnCanada: {
    borderColor: THEME_CANADA,
    backgroundColor: THEME_CANADA,
  },
  selectedBtnText: {
    color: WHITE_COLOR,
  },
  textContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  paragraphText: {
    fontSize: 19,
  },
});

export default styles;
