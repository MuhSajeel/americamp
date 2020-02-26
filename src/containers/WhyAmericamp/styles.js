import { StyleSheet } from 'react-native';
import { BLUE_COLOR, APP_COLOR, BLACK_COLOR } from '../../constants';

const Styles = StyleSheet.create({
  headingStyle: {
    textTransform: 'uppercase',
    fontFamily: 'BebasNeue-Regular',
    fontSize: 42,
    color: APP_COLOR,
    textAlign: 'center',
  },
  subHeadingStyle: {
    fontWeight: 'bold',
    fontSize: 30,
    color: BLUE_COLOR,
    marginTop: 10,
    textAlign: 'center',
  },
  descStyle: {
    fontSize: 18,
    textAlign: 'center',
    color: BLACK_COLOR,
    marginTop: 10,
    marginBottom: 10,
  },
});

export default Styles;
