import { createAction } from "redux-actions";

export const initStart = createAction<void>("INIT_START")
export const initSuccess = createAction<void>("INIT_SUCCESS")
export const initError = createAction<void>("INIT_ERROR")

