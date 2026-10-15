// src/store/helpers/asyncActionHelper.js

/**
 * Generic async thunk creator
 * @param {Function} serviceFn - API service function (returns a promise)
 * @param {Object} types - Redux action types { loading, success, error }
 */
export const createAsyncAction = (serviceFn, types) => (data) => async (dispatch) => {
  try {
    dispatch({ type: types.LOADING, data: true });

    const response = await serviceFn(data);

    if (response?.status >= 200 && response?.status < 300) {
      dispatch({ type: types.SUCCESS, data: response?.data });
      return response?.data;
    }
  } catch (error) {
    console.log('* Error ---->', error);

    // Handle blob error responses (when responseType is 'blob' but backend returns JSON error)
    const isBlobRequest = error?.config?.responseType === 'blob';
    if (isBlobRequest && error?.response?.data instanceof Blob) {
      try {
        const errorText = await error.response.data.text();
        const errorJson = JSON.parse(errorText);
        const errorMessage = errorJson?.Message || errorJson?.message || 'Export failed';
        dispatch({ type: types.ERROR, data: errorMessage });
        throw { message: errorMessage, Message: errorMessage, ...errorJson };
      } catch (parseError) {
        // If parsing fails, throw generic error
        dispatch({ type: types.ERROR, data: 'Export failed' });
        throw { message: 'Export failed', Message: 'Export failed' };
      }
    }

    // Handle regular JSON error responses
    const errorMessage = error?.response?.data?.Message || error?.response?.data?.message || error?.message || 'Request failed';
    dispatch({ type: types.ERROR, data: errorMessage });
    throw { message: errorMessage, Message: errorMessage, ...(error?.response?.data || error) };
  }
};
