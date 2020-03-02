import { StyleSheet } from 'react-native';
import { BORDER_COLOR, LABEL_COLOR, TEXT_COLOR } from '../../constants';

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 10,
  },
  labelContainer: {
    flex: 1,
    marginBottom: 10,
    padding: 10,
    alignSelf: 'stretch',
    height: 50,
    borderRadius: 6,
    borderWidth: 0.3,
    borderBottomWidth: 1,
    borderColor: BORDER_COLOR,
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  spinnerContainer: {
    alignItems: 'flex-end',
  },
  label: {
    color: LABEL_COLOR,
    fontFamily: 'BebasNeue-Regular',
    textTransform: 'uppercase',
    fontSize: 20,
  },
  nullLabel: {
    color: TEXT_COLOR,
    fontSize: 16,
  },
  cancelButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelImage: {
    width: 20,
    height: 20,
  },
});

export default styles;
