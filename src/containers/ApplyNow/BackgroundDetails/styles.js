import { StyleSheet } from 'react-native';

import { APP_COLOR, BUTTON_COLOR, WHITE_COLOR, THEME_CANADA } from '../../../constants';

export const styles = StyleSheet.create({
  heading: {
    textTransform: 'uppercase',
    fontFamily: 'BebasNeue-Regular',
    fontSize: 20,
  },
  themeAmerica: {
    color: APP_COLOR,
  },
  themeCanada: {
    color: THEME_CANADA,
  },
  textContainer: {
    marginBottom: 5,
  },
  contentText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  btnStyle: {
    flex: 1,
    backgroundColor: BUTTON_COLOR,
    justifyContent: 'center',
    width: 100,
    height: 40,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: BUTTON_COLOR,
  },
  btnText: {
    fontSize: 20,
    textTransform: 'uppercase',
    marginLeft: 10,
    fontWeight: 'bold',
    color: WHITE_COLOR,
  },
});

export default styles;
