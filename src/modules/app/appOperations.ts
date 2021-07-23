import { ApiAuth } from "../../api/index";
import { initStart, initSuccess, initError } from "./appActions";
import { userOperations } from "../user";
import { ThunkAction } from "redux-thunk";
import { UserSingleType } from "../../types";
import { Action } from "redux";
import { Dispatch } from "react";

export type AppThunkType = ThunkAction<
  Promise<void>,
  UserSingleType,
  unknown,
  Action<void>
>

export function init(): AppThunkType {
  return async function initFlow(dispatch: Dispatch<any>) {
    try {
      dispatch(initStart())
      ApiAuth.init();
      await dispatch(userOperations.getUser())
      dispatch(initSuccess())
    } catch (err) {
      dispatch(initError())
    }
  };
}
