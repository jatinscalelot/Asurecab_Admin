import { createAsyncAction } from "../../Helpers/AsyncActionHelper";
import * as services from "../../../Services/services";
import { SERVICES } from "../../Helpers/Type";

export const saveService = createAsyncAction(services.saveService, SERVICES.SAVE);
export const deleteService = createAsyncAction(services.deleteService, SERVICES.DELETE);
export const listServices = createAsyncAction(services.listServices, SERVICES.LIST);
