import { useSelector } from "react-redux";
import { useMemo } from "react";

const selectSaveGallery = (state) => state?.saveGalleryReducer || { payload: {}, loading: false, error: '' };
export const useSaveGallery = () => {
  const data = useSelector(selectSaveGallery);
  return useMemo(() => data, [data]);
};

const selectDeleteGallery = (state) => state?.deleteGalleryReducer || { payload: {}, loading: false, error: '' };
export const useDeleteGallery = () => {
  const data = useSelector(selectDeleteGallery);
  return useMemo(() => data, [data]);
};

const selectListGallery = (state) => state?.listGalleryReducer || { payload: {}, loading: false, error: '' };
export const useListGallery = () => {
  const data = useSelector(selectListGallery);
  return useMemo(() => data, [data]);
};
