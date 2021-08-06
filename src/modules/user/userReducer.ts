import { handleActions, Action, combineActions } from 'redux-actions'
import { getUserStart, getUserSuccess, getUserError, GetUserSuccessPayload  } from './userActions';
import { loginSuccess, registerSuccess } from '../auth/authActions';
import { UserSingleType } from '../../types';


export interface UserStateType {
  isLoading: boolean
  isSuccess?: boolean
  isError?: boolean | null
  error?: boolean | null
  user: UserSingleType |null
}

const INITIAL_STATE = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    error: null,
    user: null, 
  
}


export default handleActions<UserStateType, GetUserSuccessPayload>({
    [getUserStart.toString()]: (state): UserStateType => {
      return {
        ...state,            
          isLoading: true,
          isError: false,
     
      };
    }, 

    [combineActions(
      getUserSuccess,
      loginSuccess,
      registerSuccess,
    ) as any]: (state, { payload }: Action<GetUserSuccessPayload>): UserStateType => {
       return { 
         ...state,
        isLoading: false,
        isError: false,
        user: payload,
      }
    },

    [getUserError.toString()]: (state): UserStateType => ({
        ...state,       
        isLoading: false,
        isError: true,    
    }),
  },
  INITIAL_STATE,
);

