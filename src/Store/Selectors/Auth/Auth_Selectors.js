import { useSelector } from "react-redux";
import { useMemo } from "react";

const selectVerifyEmail = (state) => state?.setVerifyEmailReducer || "";
export const useVerifyEmail = () => {
  const verifyEmail = useSelector(selectVerifyEmail);
  return useMemo(() => verifyEmail, [verifyEmail]);
};

const selectPageName = (state) => state?.pageNameReducer?.pageName || "";
export const usePageName = () => {
  const pageName = useSelector(selectPageName);
  return useMemo(() => pageName, [pageName]);
};

const selectLogin = (state) => state?.LoginReducer || {};
export const useLogin = () => {
  const login = useSelector(selectLogin);
  return useMemo(() => login, [login]);
};

const selectProfile = (state) => state?.GetProfileReducer || {};
export const useProfile = () => {
  const profile = useSelector(selectProfile);
  return useMemo(() => profile, [profile]);
};

