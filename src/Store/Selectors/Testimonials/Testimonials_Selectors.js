import { useSelector } from "react-redux";
import { useMemo } from "react";

const selectSaveTestimonial = (state) => state?.saveTestimonialReducer || { payload: {}, loading: false, error: '' };
export const useSaveTestimonial = () => {
  const data = useSelector(selectSaveTestimonial);
  return useMemo(() => data, [data]);
};

const selectDeleteTestimonial = (state) => state?.deleteTestimonialReducer || { payload: {}, loading: false, error: '' };
export const useDeleteTestimonial = () => {
  const data = useSelector(selectDeleteTestimonial);
  return useMemo(() => data, [data]);
};

const selectListTestimonials = (state) => state?.listTestimonialsReducer || { payload: {}, loading: false, error: '' };
export const useListTestimonials = () => {
  const data = useSelector(selectListTestimonials);
  return useMemo(() => data, [data]);
};
