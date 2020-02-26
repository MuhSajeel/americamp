import { StyleSheet } from 'react-native';

import { BUTTON_COLOR, WHITE_COLOR, BLACK_COLOR } from '../../../constants';

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: WHITE_COLOR,
    justifyContent: 'center',
    height: 50,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: BLACK_COLOR,
    marginBottom: 20,
  },
  btnText: {
    fontSize: 17,
    textTransform: 'uppercase',
    marginLeft: 10,
    marginRight: 10,
    fontWeight: 'bold',
    color: BLACK_COLOR,
  },
  selectedBtnStyle: {
    borderColor: BUTTON_COLOR,
    backgroundColor: BUTTON_COLOR,
  },
  selectedBtnText: {
    color: WHITE_COLOR,
  },
  textContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
});

export default styles;
