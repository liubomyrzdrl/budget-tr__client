import { createAction } from "redux-actions";
import { EntrieType } from "../../types";

const GET_ENTRIES_START = "GET_ENTRIES_START";
const GET_ENTRIES_SUCCESS = "GET_ENTRIES_SUCCESS";
const GET_ENTRIES_ERROR = "GET_ENTRIES_ERROR";

export type GetEntriesSuccessPayload = Array<EntrieType>;
export type CreateEntrySuccessPayload = EntrieType;
export type UpdateEntrySuccessPayload = EntrieType;
export type DeleteEntrySuccessPayload = number;

export type CombinedEntriesPayloads =  GetEntriesSuccessPayload & CreateEntrySuccessPayload  & UpdateEntrySuccessPayload & DeleteEntrySuccessPayload

export const getEntriesStart = createAction<void>(GET_ENTRIES_START);
export const getEntriesSuccess = createAction<GetEntriesSuccessPayload>(
  GET_ENTRIES_SUCCESS
);
export const getEntriesError = createAction<void>(GET_ENTRIES_ERROR);

export const createEntryStart = createAction<void>("CREATE_ENTRY_START");
export const createEntrySuccess = createAction<CreateEntrySuccessPayload>(
  "CREATE_ENTRY_SUCCESS"
);
export const createEntryError = createAction<void>("CREATE_ENTRY_ERROR");

export const updateEntryStart = createAction<void>("UPDATE_ENTRY_START");
export const updateEntrySuccess = createAction<UpdateEntrySuccessPayload>(
  "UPDATE_ENTRY_SUCCESS"
);
export const updateEntryError = createAction<void>("UPDATE_ENTRY_ERROR");

export const deleteEntryStart = createAction<void>("DELETE_ENTRY_START");
export const deleteEntrySuccess = createAction<DeleteEntrySuccessPayload>(
  "DELETE_ENTRY_SUCCESS"
);
export const deleteEntryError = createAction<void>("DELETE_ENTRY_ERROR");
