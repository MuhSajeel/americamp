import { StyleSheet } from 'react-native';
import { LABEL_COLOR } from '../../../constants';

const Styles = StyleSheet.create({
  inputTitleStyle: {
    fontSize: 24,
    marginBottom: -20,
    color: LABEL_COLOR,
  },
  forgotPasswordStyle: { flexDirection: 'row', marginBottom: 20 },
  containerStyle: { marginTop: 15 },
});
export default Styles;
