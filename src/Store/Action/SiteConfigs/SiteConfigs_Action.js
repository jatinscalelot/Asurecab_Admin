import { createAsyncAction } from "../../Helpers/AsyncActionHelper";
import * as services from "../../../Services/services";
import { SITECONFIGS } from "../../Helpers/Type";

export const saveSiteConfig = createAsyncAction(services.saveSiteConfig, SITECONFIGS.SAVE);
export const getSiteConfig = createAsyncAction(services.getSiteConfig, SITECONFIGS.GET);
