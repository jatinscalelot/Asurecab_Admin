import { useSelector } from "react-redux";
import { useMemo } from "react";

const selectSaveSiteConfig = (state) => state?.saveSiteConfigReducer || { payload: {}, loading: false, error: '' };
export const useSaveSiteConfig = () => {
  const data = useSelector(selectSaveSiteConfig);
  return useMemo(() => data, [data]);
};

const selectGetSiteConfig = (state) => state?.getSiteConfigReducer || { payload: {}, loading: false, error: '' };
export const useGetSiteConfig = () => {
  const data = useSelector(selectGetSiteConfig);
  return useMemo(() => data, [data]);
};
