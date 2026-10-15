import { createAsyncAction } from "../../Helpers/AsyncActionHelper";
import * as Authservices from "../../../Services/services";
import { AUTH, AUTH_SYNC } from "../../Helpers/Type";

export const login = createAsyncAction(Authservices.login, AUTH.LOGIN);
export const getProfile = createAsyncAction(Authservices.getProfile, AUTH.GET_PROFILE);

// Synchronous action creators for logout and setVerifyEmail
export const logoutUser = () => { localStorage.clear(); return { type: AUTH_SYNC.LOGOUT }; };
export const setVerifyEmail = (payload) => ({
    type: AUTH_SYNC.SET_VERIFY_EMAIL,
    payload,
});
export const setPageName = (payload) => ({
    type: AUTH_SYNC.SET_PAGE_NAME,
    payload,
});
