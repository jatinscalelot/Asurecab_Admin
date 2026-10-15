import { createAsyncReducer } from "../../Helpers/AsyncReducerHelper";
import { GALLERY } from "../../Helpers/Type";

export const saveGalleryReducer = createAsyncReducer(GALLERY.SAVE);
export const deleteGalleryReducer = createAsyncReducer(GALLERY.DELETE);
export const listGalleryReducer = createAsyncReducer(GALLERY.LIST);
