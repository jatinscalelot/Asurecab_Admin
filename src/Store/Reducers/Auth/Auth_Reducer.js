import { createAsyncReducer } from "../../Helpers/AsyncReducerHelper";
import { AUTH, AUTH_SYNC } from "../../Helpers/Type";

// Each reducer is just one line
export const LoginReducer = createAsyncReducer(AUTH.LOGIN);
export const GetProfileReducer = createAsyncReducer(AUTH.GET_PROFILE);
export const setVerifyEmailReducer = (state = "", action) => {
    if (action.type === AUTH_SYNC.SET_VERIFY_EMAIL) return action.payload;
    return state;
};

export const pageNameReducer = (state = { pageName: "" }, action) => {
    if (action.type === AUTH_SYNC.SET_PAGE_NAME) return { ...state, pageName: action.payload };
    return state;
};
