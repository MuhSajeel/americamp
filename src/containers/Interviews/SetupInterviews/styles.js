import { StyleSheet } from 'react-native';
import { BLACK_COLOR } from '../../../constants';

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 0.3,
    paddingLeft: 15,
    textTransform: 'uppercase',
    fontFamily: 'BebasNeue-Regular',
    fontSize: 20,
    color: BLACK_COLOR,
    borderBottomWidth: 1,
    borderRadius: 6,
    height: 50,
  },
  footerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default styles;
