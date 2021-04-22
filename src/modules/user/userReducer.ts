import { handleActions, Action, combineActions } from 'redux-actions'
import { getUserStart, getUserSuccess, getUserError, GetUserSuccessPayload  } from './userActions';
import { loginSuccess, registerSuccess } from '../auth/authActions';
import * as appActions from '../app/appActions';
import { authActions } from '../auth';
import { UserType, UserSingleType } from '../../types';


export interface UserStateType {
  isLoading: boolean
  isSuccess?: boolean
  isError?: boolean | null
  error?: boolean | null
  user?: UserSingleType | null
  // email: string
  // id: number
  // password: string
  // username: string
}

const INITIAL_STATE = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    error: null,
    user: null, 
  
}


export default handleActions<UserStateType>({
    [getUserStart.toString()]: (state): UserStateType => {
      console.log('STATE', state);
      return {
        ...state,            
          isLoading: true,
          isError: false,
     
      };
    },
    //@ts-ignore
    [combineActions(
      getUserSuccess.toString(),
      loginSuccess.toString(),
      registerSuccess.toString(),
    )]: (state, { payload }: Action<any>): UserStateType => {
      console.log("REDUCER", payload)
       return { 
         ...state,
        isLoading: false,
        isError: false,
        user: payload,
      }
    },
    // [getUserSuccess.toString()]: (state, { payload }: Action<any>): UserStateType => {
    //   console.log("REDUCER", payload)
    //    return { 
    //      ...state,
    //     isLoading: false,
    //     isError: false,
    //     user: payload,
    //   }
    // },

    [getUserError.toString()]: (state): UserStateType => ({
        ...state,       
        isLoading: false,
        isError: true,    
    }),
  },
  INITIAL_STATE,
);
