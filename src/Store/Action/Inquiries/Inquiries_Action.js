import { createAsyncAction } from "../../Helpers/AsyncActionHelper";
import * as services from "../../../Services/services";
import { INQUIRIES } from "../../Helpers/Type";

export const listInquiries = createAsyncAction(services.listInquiries, INQUIRIES.LIST);
export const updateInquiryStatus = createAsyncAction(services.updateInquiryStatus, INQUIRIES.UPDATE_STATUS);
export const deleteInquiry = createAsyncAction(services.deleteInquiry, INQUIRIES.DELETE);
