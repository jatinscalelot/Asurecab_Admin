import { useSelector } from "react-redux";
import { useMemo } from "react";

const selectImageUpload = (state) => state?.ImageUploadReducer || {};
export const useImageUpload = () => {
  const upload = useSelector(selectImageUpload);
  return useMemo(() => upload, [upload]);
};
