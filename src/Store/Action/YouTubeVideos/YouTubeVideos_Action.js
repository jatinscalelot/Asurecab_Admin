import { createAsyncAction } from "../../Helpers/AsyncActionHelper";
import * as services from "../../../Services/services";
import { YOUTUBEVIDEOS } from "../../Helpers/Type";

export const saveYouTubeVideo = createAsyncAction(services.saveYouTubeVideo, YOUTUBEVIDEOS.SAVE);
export const deleteYouTubeVideo = createAsyncAction(services.deleteYouTubeVideo, YOUTUBEVIDEOS.DELETE);
export const listYouTubeVideos = createAsyncAction(services.listYouTubeVideos, YOUTUBEVIDEOS.LIST);
