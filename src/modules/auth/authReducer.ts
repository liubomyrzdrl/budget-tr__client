import { handleActions } from "redux-actions";
import {
  loginStart,
  loginSuccess,
  loginError,
  registerStart,
  registerSuccess,
  registerError,
} from "./authActions";

type LoginRegisterType = {
  isLoading: boolean
  isError: boolean
  error?: any
}

export type AuthStateType = {
  login: LoginRegisterType
  register: LoginRegisterType
}

const INITIAL_STATE = {
  login: {
    isLoading: false,
    isError: false,
    error: null,
  },

  register: {
    isLoading: false,
    isError: false,
    error: null,
  },
}

export default handleActions<AuthStateType>(
  {
    [loginStart.toString()]: (state) => {
      return {
        ...state,
        login: {
          ...state.login,
          isLoading: true,
          isError: false,
          error: null,
        },
      };
    },

    [loginSuccess.toString()]: (state: AuthStateType) => ({
      ...state,
      login: {
        ...state.login,
        isLoading: false,
        isError: false,
      },
    }),

    [loginError.toString()]: (state, {payload}): AuthStateType=> ({
      ...state,
      login: {
        ...state.login,
        isLoading: false,
        isError: true,
        error: payload

      },
    }),

    [registerStart.toString()]: (state: AuthStateType) => {
      return {
        ...state,
        register: {
          ...state.register,
          isLoading: true,
          isError: false,
          error: null,
        },
      };
    },

    [registerSuccess.toString()]: (state: AuthStateType,) => ({
      ...state,
      register: {
        ...state.register,
        isLoading: false,
        isError: false,
      },
    }),

    [registerError.toString()]: (state, { payload }): AuthStateType => ({
      ...state,
      register: {
        ...state.register,
        isLoading: false,
        isError: true,
        error: payload
      },
    }),
  },
  INITIAL_STATE
);
