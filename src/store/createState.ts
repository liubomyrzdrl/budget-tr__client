import { createStore, applyMiddleware, Store, CombinedState } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import reducer from "../modules";
import { Action } from "redux-actions";
import { GetEntriesSuccessPayload } from "../modules/entries/entriesActions";
import {  entriesActions } from "../modules/entries";
import { GetUserSuccessPayload } from "../modules/user/userActions";
import { EntryStateType } from "../modules/entries/entriesReducer";
import { AppStateType } from "../modules/app/appReducer";
import { AuthStateType } from "../modules/auth/authReducer";
import { UserStateType } from "../modules/user/userReducer";

export type MainStateType = Store<
  CombinedState<{
    appReducer: AppStateType;
    entryReducer: EntryStateType;
    authReducer: AuthStateType;
    userReducer: UserStateType;
  }>,
  Action<typeof entriesActions> | Action<GetUserSuccessPayload> & Action<void>
>

const state = createStore(reducer, applyMiddleware(thunk, logger))

export default state;
