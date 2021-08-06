import { createAction } from 'redux-actions';
import { UserSingleType } from '../../types';

export const loginStart = createAction<void>("LOGIN_START")
 export const loginSuccess = createAction<UserSingleType>("LOGIN_SUCCESS")
export const loginError = createAction<any>("LOGIN_ERROR")

export const registerStart = createAction<void>("REGISTER_START")
export const registerSuccess = createAction<UserSingleType>("REGISTER_SUCCESS")
export const registerError = createAction<any>("REGISTER_ERROR")