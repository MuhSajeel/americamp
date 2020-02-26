import { StyleSheet } from 'react-native';
import { BORDER_COLOR, TITLE_COLOR } from '../../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    paddingTop: 20,
  },
  title: {
    fontFamily: 'BebasNeue-Regular',
    fontSize: 28,
    fontWeight: 'bold',
    color: BORDER_COLOR,
  },
  text: {
    fontFamily: 'BebasNeue-Regular',
    fontSize: 18,
    fontWeight: 'bold',
    color: TITLE_COLOR,
  },
  fieldsContainer: {
    paddingTop: 30,
    paddingBottom: 10,
  },
  label: {
    fontFamily: 'BebasNeue-Regular',
    fontSize: 16,
    fontWeight: '500',
    color: TITLE_COLOR,
  },
  bottomButtonsContainer: {
    paddingBottom: 40,
  },
});

export default styles;
