import { StyleSheet, Dimensions } from 'react-native';
import { LABEL_COLOR, TEXT_COLOR } from '../../constants';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height,
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  upperContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    width,
  },
  imageStyle: {
    width,
    height: (70 * height) / 100,
  },
  textContainer: {
    padding: 20,
  },
  title: {
    fontFamily: 'BebasNeue-Regular',
    textTransform: 'uppercase',
    color: LABEL_COLOR,
    fontSize: 32,
  },
  text: {
    color: TEXT_COLOR,
    fontSize: 16,
  },
  lowerContainer: {
    height: 30,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    margin: 30,
    marginBottom: 20,
    marginTop: 10,
  },
  lowerButtonContainer: {
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 30,
    marginBottom: 20,
    marginTop: 10,
  },
  pageIndicator: {
    paddingRight: 10,
  },
  redCircle: {
    width: 17,
    height: 17,
    borderRadius: 50,
    // backgroundColor: 'red',
    margin: 4,
  },
  greyCircle: {
    width: 17,
    height: 17,
    borderRadius: 50,
    backgroundColor: 'grey',
    margin: 4,
  },
});

export default styles;
