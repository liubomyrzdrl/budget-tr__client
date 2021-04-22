import { createAction } from 'redux-actions';
import { UserType, UserSingleType } from '../../types';

// export const login = createAsyncActions('auth/LOGIN');
// export const register = createAsyncActions('auth/REGISTER');


export const loginStart = createAction<void>("LOGIN_START")
//export const loginSuccess = createAction<void>("LOGIN_SUCCESS")
 export const loginSuccess = createAction<UserSingleType>("LOGIN_SUCCESS")
export const loginError = createAction<any>("LOGIN_ERROR")

export const registerStart = createAction<void>("REGISTER_START")
//export const registerSuccess = createAction<void>("REGISTER_SUCCESS")
export const registerSuccess = createAction<UserSingleType>("REGISTER_SUCCESS")
export const registerError = createAction<any>("REGISTER_ERROR")