/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable camelcase */
 
import { switchMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { loginAction, signUpFailure } from '../actions';
import { RestClient } from '../../network/RestClient';
import { toast } from 'react-toastify';

import {
  API_ENDPOINTS,
  NETWORK_ERROR_MSG,
  ERROR_MSG,
  UNKNOWN_ERROR_MSG,
  SIGNUP,
  ACCOUNT_CREATE_MSG,
} from '../../constants';

export class SignUpEpic {
  static signUp = action$ =>
    action$.pipe(
      ofType(SIGNUP),
      switchMap(async ({ payload }) => {
        try {
          const response = await RestClient.post(API_ENDPOINTS.SIGNUP, payload);
          const { status, data: resObj, problem } = response;
          const userObj = {
            email: payload.user.email,
            password: payload.user.password,
            fetchedUserProfile: payload.user.fetchedUserProfile,
            formsStatus: payload.user.formsStatus,
          };
          if (status && status === 200) {
            if (resObj && resObj.success) {
              toast.success("Registered Successfully", {
                position: toast.POSITION.TOP_RIGHT
              });
              return loginAction(userObj);
            }
            toast.error("Error Notification !", {
              position: toast.POSITION.TOP_RIGHT
            });
            return signUpFailure();
          }
          if (status && (status === 401 || status === 422 || status === 512)) {
            if (resObj && !resObj.success) {
              toast.error("Error Notification !", {
                position: toast.POSITION.TOP_RIGHT
              });
        
              return signUpFailure()
            }
            toast.error("Error Notification !", {
              position: toast.POSITION.TOP_RIGHT
            });
            return signUpFailure();
          }
          if (problem && problem === NETWORK_ERROR_MSG) {
            toast.error("Error Notification !", {
              position: toast.POSITION.TOP_RIGHT
            });
            return signUpFailure();
          }
          toast.error("Error Notification !", {
            position: toast.POSITION.TOP_RIGHT
          });
          return signUpFailure();
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log('Sign Up Unknown Error', error);
          toast.error("Error Notification !", {
            position: toast.POSITION.TOP_RIGHT
          });
          return signUpFailure();
        }
      })
    );
}
