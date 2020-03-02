import { URL_LINK_FETCH_SUCCESS } from '../../constants';
import { UrlLinks } from '../state/initial';

export default (state = JSON.parse(JSON.stringify(UrlLinks)), { type, payload }) => {
  switch (type) {
    case URL_LINK_FETCH_SUCCESS:
      return {
        ...state,
        ...(payload || UrlLinks),
        android_url:
          payload &&
          payload.android_url &&
          (payload.android_url !== '' || payload.android_url !== null)
            ? payload.android_url
            : UrlLinks.android_url,
        ios_url:
          payload && payload.ios_url && (payload.ios_url !== '' || payload.ios_url !== null)
            ? payload.ios_url
            : UrlLinks.ios_url,
      };
    default:
      return state;
  }
};
