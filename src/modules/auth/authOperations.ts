import { ApiAuth } from "../../api/index";
import { loginStart,loginSuccess, loginError, registerStart, registerSuccess, registerError } from './authActions';
import { ThunkAction } from "redux-thunk"
import { Dispatch } from "react"
import { Action } from "redux-actions"
import { UserSingleType } from "../../types";

export type AuthThunkType = ThunkAction<
  Promise<UserSingleType| void>,
  UserSingleType,
  unknown,
  Action<UserSingleType>
>


export function login(body: UserSingleType):AuthThunkType {
  return async function loginThunk(dispatch: Dispatch<Action<UserSingleType | void>>) {
    try {
      dispatch(loginStart());    
      const res = await ApiAuth.login(body);
      const token = res.data.token;
      ApiAuth.setToken(token);
      window.localStorage.setItem('token', String(token));
      dispatch(loginSuccess(res.data.data))
    } catch (err) {
      dispatch(loginError(err));
    }
  };
}

export function register(body: UserSingleType): AuthThunkType {
  return async function registerThunk(dispatch:any) {
    try {
      dispatch(registerStart());

      const res = await ApiAuth.register(body);
  
      const token = res.data.token;
      ApiAuth.setToken(token);
      window.localStorage.setItem('token', String(token) );

      dispatch(registerSuccess(res.data.data));
    } catch (err) {
      dispatch(registerError(err));
      //dispatch(actions.register.error({ message: err}));
    }
  };
}