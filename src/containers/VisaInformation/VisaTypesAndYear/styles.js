import { StyleSheet } from 'react-native';
import { APP_COLOR } from '../../../constants';

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 15,
    paddingTop: 20,
    paddingBottom: 10,
    fontWeight: 'bold',
  },
  highlightBorder: {
    backgroundColor: APP_COLOR,
    borderRadius: 5,
    color: '#fff',
    borderWidth: 0.5,
  },
  simpleBorder: {
    borderColor: 'black',
  },
});

export default styles;
