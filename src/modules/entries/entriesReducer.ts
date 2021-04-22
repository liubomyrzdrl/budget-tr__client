import { handleActions, Action } from "redux-actions";
import {
  getEntriesStart,
  getEntriesSuccess,
  getEntriesError,
  GetEntriesSuccessPayload,
  CreateEntrySuccessPayload,
  createEntryStart,
  createEntrySuccess,
  createEntryError,
  updateEntryStart,
  updateEntrySuccess,
  updateEntryError,
  UpdateEntrySuccessPayload,
  deleteEntryStart,
  deleteEntrySuccess,
  deleteEntryError,
  DeleteEntrySuccessPayload,
  CombinedEntriesPayloads,
} from "./entriesActions";
import { EntrieType } from "../../types";


export interface EntryStateType {
  items: Array<any>;
  isLoading: boolean;
  isSuccess?: boolean;
  isError?: boolean | null;
}

const INITIAL_STATE: EntryStateType = {
  items: [],
  isLoading: false,
  isSuccess: false,
  isError: null,
};

const entriesReducer = handleActions<EntryStateType, CombinedEntriesPayloads>(
  {
    [getEntriesStart.toString()]: (state): EntryStateType => {
      return {
        ...state,
        isLoading: true,
      };
    },

    [getEntriesSuccess.toString()]: (
      state,
      { payload }: Action<GetEntriesSuccessPayload>
    ): EntryStateType => {
      return {
        ...state,
        items: payload,
        isLoading: false,
        isSuccess: true,
      };
    },

    [getEntriesError.toString()]: (state): EntryStateType => {
      return {
        ...state,
        isLoading: false,
        isError: null,
      };
    },

    [createEntryStart.toString()]: (state): EntryStateType => {
      return {
        ...state,
        isLoading: true,
      };
    },

    [createEntrySuccess.toString()]: (
      state,
      { payload }: Action<CreateEntrySuccessPayload>
    ): EntryStateType => {
      return {
        ...state,
        items: [payload, ...state.items],
        isLoading: false,
        isSuccess: true,
      };
    },

    [createEntryError.toString()]: (state): EntryStateType => {
      return {
        ...state,
        isLoading: false,
        isError: null,
      };
    },

    [updateEntryStart.toString()]: (state): EntryStateType => {
      return {
        ...state,
        isLoading: true,
      };
    },

    [updateEntrySuccess.toString()]: (
      state,
      { payload }: Action<any>
    ): EntryStateType => {
      return {
        ...state,
        items: state.items?.map((item) => {
          if (item.id === payload.id) {
            item = payload;
          }
          return item;
        }),
        isLoading: false,
        isSuccess: true,
      };
    },

    [updateEntryError.toString()]: (state): EntryStateType => {
      return {
        ...state,
        isLoading: false,
        isError: null,
      };
    },

    [deleteEntryStart.toString()]: (state): EntryStateType => {
      return {
        ...state,
        isLoading: true,
      };
    },

    [deleteEntrySuccess.toString()]: (
      state,
      { payload }: Action<any>
    ): EntryStateType => {
      console.log("Uodate Delete", payload);
      return {
        ...state,
        items: state.items?.filter((item) => item.id !== payload),
        isLoading: false,
        isSuccess: true,
      };
    },

    [deleteEntryError.toString()]: (state): EntryStateType => {
      return {
        ...state,
        isLoading: false,
        isError: null,
      };
    },
  },
  INITIAL_STATE
);

export default entriesReducer;
