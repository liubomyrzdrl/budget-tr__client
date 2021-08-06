import { ApiAccount } from '../../api'
import { ThunkAction } from "redux-thunk";
import { getUserStart, getUserSuccess, getUserError } from './userActions';
import { UserSingleType } from '../../types';
import { Dispatch } from "redux";
import { Action } from "redux-actions";
import { UserStateType } from './userReducer';

export type UserThunkType = ThunkAction<
  Promise<UserSingleType| void>,
  UserStateType,
  unknown,
  Action<any>
>;


export function getUser(): UserThunkType {
  return async function getUserFlow(dispatch: Dispatch) {
    try {
      dispatch(getUserStart())
      const res = await ApiAccount.get()
      dispatch(getUserSuccess(res.data));
    } catch (err) {
      dispatch(getUserError());
    }
  };
}
