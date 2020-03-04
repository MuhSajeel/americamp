import { Alert } from "react";
import { switchMap } from "rxjs/operators";
import { ofType } from "redux-observable";

import { logoutActionSuccess, logoutActionFailure } from "../actions";
import { setItem, clear } from "../../helpers/Localstorage";
import { LOGOUT, LOGIN_NAV, UNKNOWN_ERROR_MSG } from "../../constants";
//import NavigationService from "../../navigator/Navigation";
import { RestClient } from "../../network/RestClient";

export class LogoutEpic {
  static logout = action$ =>
    action$.pipe(
      ofType(LOGOUT),
      switchMap(async () => {
        //NavigationService.navigate(LOGIN_NAV);
        try {
          await clear();
          await setItem("reduceOnboarding", "reduceOnboarding");
          RestClient.setHeader("Authorization", null);
          return logoutActionSuccess();
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log("Logout Unknown Error", error);
          Alert.alert(UNKNOWN_ERROR_MSG);
          return logoutActionFailure();
        }
      })
    );
}
