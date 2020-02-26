import { StyleSheet } from 'react-native';
import { TITLE_COLOR } from '../../constants';

const Styles = StyleSheet.create({
  itemHeading: {
    fontSize: 22,
    fontFamily: 'BebasNeue-Regular',
    color: TITLE_COLOR,
  },
  container: {
    flex: 1,
    margin: 10,
  },
});

export default Styles;
