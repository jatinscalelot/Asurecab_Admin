import { createAsyncReducer } from "../../Helpers/AsyncReducerHelper";
import { INQUIRIES } from "../../Helpers/Type";

export const listInquiriesReducer = createAsyncReducer(INQUIRIES.LIST);
export const updateInquiryStatusReducer = createAsyncReducer(INQUIRIES.UPDATE_STATUS);
export const deleteInquiryReducer = createAsyncReducer(INQUIRIES.DELETE);
