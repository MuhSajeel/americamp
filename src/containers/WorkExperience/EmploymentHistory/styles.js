import { StyleSheet } from 'react-native';
import { APP_COLOR } from '../../../constants';

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 17,
    paddingTop: 20,
    paddingBottom: 10,
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
  spinnerContainer: {
    alignItems: 'flex-end',
  },
  button: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default styles;
