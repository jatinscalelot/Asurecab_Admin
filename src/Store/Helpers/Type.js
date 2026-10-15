// Helper to create LOADING / SUCCESS / ERROR action types
const createActionTypes = (base) => ({
  LOADING: `${base}_LOADING`,
  SUCCESS: `${base}_SUCCESS`,
  ERROR: `${base}_ERROR`,
});

// Helper to generate action type groups for a feature
const createFeatureActions = (featureName, actions) => {
  return actions.reduce((acc, action) => {
    acc[action] = createActionTypes(`${action}_${featureName}`);
    return acc;
  }, {});
};

// Define actions for each module
export const AUTH = createFeatureActions("AUTH", [
  "LOGIN",
  "GET_PROFILE",
]);

export const UPLOADS = createFeatureActions("UPLOADS", [
  "IMAGE",
]);

export const SERVICES = createFeatureActions("SERVICES", [
  "SAVE",
  "DELETE",
  "LIST",
]);

export const GALLERY = createFeatureActions("GALLERY", [
  "SAVE",
  "DELETE",
  "LIST",
]);

export const TESTIMONIALS = createFeatureActions("TESTIMONIALS", [
  "SAVE",
  "DELETE",
  "LIST",
]);

export const INQUIRIES = createFeatureActions("INQUIRIES", [
  "LIST",
  "UPDATE_STATUS",
  "DELETE",
]);

export const SITECONFIGS = createFeatureActions("SITECONFIGS", [
  "SAVE",
  "GET",
]);

export const TAXIROUTES = createFeatureActions("TAXIROUTES", [
  "SAVE",
  "DELETE",
  "LIST",
]);

export const YOUTUBEVIDEOS = createFeatureActions("YOUTUBEVIDEOS", [
  "SAVE",
  "DELETE",
  "LIST",
]);

// Optional sync action types
export const AUTH_SYNC = {
  LOGOUT: "LOGOUT",
  SET_VERIFY_EMAIL: "SET_VERIFY_EMAIL",
  SET_PAGE_NAME: "SET_PAGE_NAME",
};

export const SIDEBAR_SYNC = {
  TOGGLE_DESKTOP: "TOGGLE_DESKTOP",
  TOGGLE_MOBILE: "TOGGLE_MOBILE",
};
