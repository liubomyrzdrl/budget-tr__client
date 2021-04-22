import { createAction } from 'redux-actions';
import { UserSingleType, UserType } from '../../types';


export type GetUserSuccessPayload =  UserSingleType


export const getUserStart = createAction<void>("GET_USER_START");
export const getUserSuccess = createAction<UserSingleType>("GET_USER_SUCCESS");
export const getUserError = createAction<void>("GET_USER_ERROR");
