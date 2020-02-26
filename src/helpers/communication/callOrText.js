import { CALL_OR_TEXT } from '../../constants';
import { makeCall } from './makeCall';
import { makeText } from './makeText';

const callOrText = (option, phoneNumber) => {
  const { CALL, TEXT } = CALL_OR_TEXT;
  switch (option) {
    case CALL:
      return makeCall(phoneNumber);
    case TEXT:
      return makeText(phoneNumber);
    default:
      return null;
  }
};

export { callOrText };
