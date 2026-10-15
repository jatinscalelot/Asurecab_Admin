import { createAsyncReducer } from "../../Helpers/AsyncReducerHelper";
import { UPLOADS } from "../../Helpers/Type";

export const ImageUploadReducer = createAsyncReducer(UPLOADS.IMAGE);
