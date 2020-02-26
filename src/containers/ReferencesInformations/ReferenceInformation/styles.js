import { StyleSheet } from 'react-native';
import { APP_COLOR, TITLE_COLOR } from '../../../constants';

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: TITLE_COLOR,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
  },
  middleBox: {
    margin: 20,
    marginLeft: 0,
    backgroundColor: APP_COLOR,
    width: '40%',
    aspectRatio: 1,
    borderRadius: 5,
    padding: 5,
    alignItems: 'center',
  },
  middleBoxText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'rgb(255, 255, 255)',
    padding: 10,
  },
  lowerTextcontainer: {
    paddingTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  lowerText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default styles;
