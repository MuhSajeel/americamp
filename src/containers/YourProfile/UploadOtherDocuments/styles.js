import { StyleSheet } from 'react-native';
import { LIGHT_GREY } from '../../../constants';

const Styles = StyleSheet.create({
  uploadButtonStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 20,
  },
  inputStyle: {
    fontSize: 24,
    borderWidth: 1,
    borderColor: LIGHT_GREY,
    borderRadius: 5,
    height: 60,
    padding: 10,
    marginTop: 20,
    fontWeight: 'bold',
  },
});
export default Styles;
