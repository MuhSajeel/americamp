import { StyleSheet } from 'react-native';
import { TITLE_COLOR } from '../../constants';

const Styles = StyleSheet.create({
  itemHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: TITLE_COLOR,
    marginLeft: 10,
    marginTop: 20,
    marginBottom: 10,
  },
  buttonStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

export default Styles;
