import { useSelector } from "react-redux";
import { useMemo } from "react";

const selectListInquiries = (state) => state?.listInquiriesReducer?.payload?.Data;
export const useListInquiries = () => {
  const data = useSelector(selectListInquiries);
  return useMemo(() => data, [data]);
};

const selectUpdateInquiryStatus = (state) => state?.updateInquiryStatusReducer || { payload: {}, loading: false, error: '' };
export const useUpdateInquiryStatus = () => {
  const data = useSelector(selectUpdateInquiryStatus);
  return useMemo(() => data, [data]);
};

const selectDeleteInquiry = (state) => state?.deleteInquiryReducer || { payload: {}, loading: false, error: '' };
export const useDeleteInquiry = () => {
  const data = useSelector(selectDeleteInquiry);
  return useMemo(() => data, [data]);
};
