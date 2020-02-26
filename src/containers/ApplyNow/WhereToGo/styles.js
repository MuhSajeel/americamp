import { StyleSheet } from 'react-native';
import { WHITE_COLOR } from '../../../constants';

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    marginTop: 30,
    marginBottom: 20,
  },
  contentContainer: {
    marginLeft: 30,
    marginRight: 30,
  },
  image: {
    height: 100,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 28,
    fontWeight: 'bold',
    color: WHITE_COLOR,
    textTransform: 'uppercase',
  },
});

export default styles;
