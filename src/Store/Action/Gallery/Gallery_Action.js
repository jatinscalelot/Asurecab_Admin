import { createAsyncAction } from "../../Helpers/AsyncActionHelper";
import * as services from "../../../Services/services";
import { GALLERY } from "../../Helpers/Type";

export const saveGallery = createAsyncAction(services.saveGallery, GALLERY.SAVE);
export const deleteGallery = createAsyncAction(services.deleteGallery, GALLERY.DELETE);
export const listGallery = createAsyncAction(services.listGallery, GALLERY.LIST);
