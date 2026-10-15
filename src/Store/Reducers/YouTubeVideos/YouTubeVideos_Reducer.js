import { createAsyncReducer } from "../../Helpers/AsyncReducerHelper";
import { YOUTUBEVIDEOS } from "../../Helpers/Type";

export const saveYouTubeVideoReducer = createAsyncReducer(YOUTUBEVIDEOS.SAVE);
export const deleteYouTubeVideoReducer = createAsyncReducer(YOUTUBEVIDEOS.DELETE);
export const listYouTubeVideosReducer = createAsyncReducer(YOUTUBEVIDEOS.LIST);
