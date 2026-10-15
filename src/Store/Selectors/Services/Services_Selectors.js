import { useSelector } from "react-redux";
import { useMemo } from "react";

const selectSaveService = (state) => state?.saveServiceReducer || { payload: {}, loading: false, error: '' };
export const useSaveService = () => {
  const data = useSelector(selectSaveService);
  return useMemo(() => data, [data]);
};

const selectDeleteService = (state) => state?.deleteServiceReducer || { payload: {}, loading: false, error: '' };
export const useDeleteService = () => {
  const data = useSelector(selectDeleteService);
  return useMemo(() => data, [data]);
};

const selectListServices = (state) => state?.listServicesReducer || { payload: {}, loading: false, error: '' };
export const useListServices = () => {
  const data = useSelector(selectListServices);
  return useMemo(() => data, [data]);
};
