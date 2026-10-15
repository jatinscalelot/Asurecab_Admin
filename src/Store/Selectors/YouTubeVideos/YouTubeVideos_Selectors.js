import { useSelector } from "react-redux";
import { useMemo } from "react";

const selectSaveYouTubeVideo = (state) => state?.saveYouTubeVideoReducer || { payload: {}, loading: false, error: '' };
export const useSaveYouTubeVideo = () => {
  const data = useSelector(selectSaveYouTubeVideo);
  return useMemo(() => data, [data]);
};

const selectDeleteYouTubeVideo = (state) => state?.deleteYouTubeVideoReducer || { payload: {}, loading: false, error: '' };
export const useDeleteYouTubeVideo = () => {
  const data = useSelector(selectDeleteYouTubeVideo);
  return useMemo(() => data, [data]);
};

const selectListYouTubeVideos = (state) => state?.listYouTubeVideosReducer?.payload?.Data || [];
export const useListYouTubeVideos = () => {
  const data = useSelector(selectListYouTubeVideos);
  return useMemo(() => data, [data]);
};
