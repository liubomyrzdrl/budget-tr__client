import {
  getEntriesStart,
  getEntriesSuccess,
  getEntriesError,
  createEntryStart,
  createEntrySuccess,
  createEntryError,
  updateEntryStart,
  updateEntrySuccess,
  updateEntryError,
  deleteEntryStart,
  deleteEntrySuccess,
  deleteEntryError
} from "./entriesActions";
import { ApiEntries } from "../../api";
import { Dispatch } from "redux";
import { Action } from "redux-actions";
import { ThunkAction } from "redux-thunk";
import { EntryStateType } from "./entriesReducer";
import { EntrieType, EntrySingleType } from "../../types";

type EntiesPayload = {
  payload: () => EntrieType[];
};

export type EntryThunkType = ThunkAction<
  Promise<Array<EntrieType> | void | EntrieType>,
  EntryStateType,
  unknown,
  Action<EntiesPayload>
>

export function getEntries(userId: number, date: string): EntryThunkType {
  return async function getEntriesThunk(
    dispatch: Dispatch<Action<void> | Action<Array<EntrieType>>>
  ) {
    try {
      dispatch(getEntriesStart());
      const entries = await ApiEntries.fetchEntries(userId, date);
      dispatch(getEntriesSuccess(entries.data));
    } catch (error) {
      dispatch(getEntriesError());
    }
  };
}

export function createEntry(entrie: EntrieType): EntryThunkType {
  return async function createEntryThunk(
    dispatch: Dispatch<Action<void> | Action<EntrieType>>,
    getState
  ) {
    try {
      dispatch(createEntryStart());
      const data = await ApiEntries.createEntry(entrie);

      dispatch(createEntrySuccess(data.data));
    } catch (error) {
      dispatch(createEntryError());
    }
  };
}

export function updateEntry(entrie: EntrieType): EntryThunkType {
  return async function updateEntryThunk(
    dispatch: Dispatch<Action<void> | Action<EntrySingleType>>
  ) {
    try {
      dispatch(updateEntryStart());
      const data = await ApiEntries.updateEntry(entrie);
      dispatch(updateEntrySuccess(data.data))
    } catch (error) {
      dispatch(updateEntryError());
    }
  };
}

export function deleteEntry(id: number): EntryThunkType {
  return async function deleteEntryThunk(
    dispatch: Dispatch<Action<number | void> | Action<EntrieType>>
  ) {
    try {
      dispatch(deleteEntryStart());
        await ApiEntries.deleteEntries(id);
        
      dispatch(deleteEntrySuccess(id))
    } catch (error) {
      dispatch(deleteEntryError());
    }
  };
}
