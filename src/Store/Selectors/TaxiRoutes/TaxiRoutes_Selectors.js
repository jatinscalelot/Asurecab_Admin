import { useSelector } from "react-redux";
import { useMemo } from "react";

const selectSaveTaxiRoute = (state) => state?.saveTaxiRouteReducer || { payload: {}, loading: false, error: '' };
export const useSaveTaxiRoute = () => {
  const data = useSelector(selectSaveTaxiRoute);
  return useMemo(() => data, [data]);
};

const selectDeleteTaxiRoute = (state) => state?.deleteTaxiRouteReducer || { payload: {}, loading: false, error: '' };
export const useDeleteTaxiRoute = () => {
  const data = useSelector(selectDeleteTaxiRoute);
  return useMemo(() => data, [data]);
};

const selectListTaxiRoutes = (state) => state?.listTaxiRoutesReducer || { payload: {}, loading: false, error: '' };
export const useListTaxiRoutes = () => {
  const data = useSelector(selectListTaxiRoutes);
  return useMemo(() => data, [data]);
};
