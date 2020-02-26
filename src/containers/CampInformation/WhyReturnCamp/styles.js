import { StyleSheet } from 'react-native';

import { APP_COLOR } from '../../../constants';

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: '500',
  },
  middleBox: {
    margin: 20,
    marginLeft: 0,
    backgroundColor: APP_COLOR,
    width: '45%',
    aspectRatio: 1,
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  middleBoxText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'rgb(255, 255, 255)',
  },
  lowerTextcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lowerText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default styles;
