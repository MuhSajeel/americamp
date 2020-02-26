import { StyleSheet } from 'react-native';
import { LABEL_COLOR, BORDER_COLOR } from '../../../constants';

const Styles = StyleSheet.create({
  label: {
    fontFamily: 'BebasNeue-Regular',
    fontSize: 20,
    color: LABEL_COLOR,
  },
  cardImageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 10,
    marginTop: 2,
    marginBottom: 5,
  },
  cardImage: {
    height: 40,
    width: 40,
  },
  arrowImage: {
    height: 20,
    width: 20,
  },
  cardsImage: {
    height: 40,
    width: 300,
    resizeMode: 'contain',
  },
  progressSectionContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  bottomSectionContainer: {
    width: '100%',
    marginTop: 20,
    marginBottom: 10,
    padding: 20,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
  },
});
export default Styles;
