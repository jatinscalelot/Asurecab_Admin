import { createAsyncAction } from "../../Helpers/AsyncActionHelper";
import * as services from "../../../Services/services";
import { UPLOADS } from "../../Helpers/Type";

export const uploadImage = createAsyncAction(services.uploadImage, UPLOADS.IMAGE);
