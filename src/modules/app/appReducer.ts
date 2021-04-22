import { handleActions } from 'redux-actions';
import { initStart, initSuccess, initError } from './appActions';


export type AppStateType = {
  isLoading: boolean
  isError: boolean
  error: boolean | null
}

const INITIAL_STATE = {
  isLoading: false,
  isError: false,
  error: null,
}


export default handleActions<AppStateType>({
    [initStart.toString()]: (state) => {
      return {
        ...state,
        isLoading: true,
        isError: false,
        error: null,
      };
    },

    [initSuccess.toString()]: (state):AppStateType => ({
      ...state,
      isLoading: false,
      isError: false,
    }),

    [initError.toString()]: (state):AppStateType => ({
      ...state,
      isLoading: false,
      isError: true,
    }),
  },
  INITIAL_STATE,
);
