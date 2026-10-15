import { createAsyncReducer } from "../../Helpers/AsyncReducerHelper";
import { SITECONFIGS } from "../../Helpers/Type";

export const saveSiteConfigReducer = createAsyncReducer(SITECONFIGS.SAVE);
export const getSiteConfigReducer = createAsyncReducer(SITECONFIGS.GET);
