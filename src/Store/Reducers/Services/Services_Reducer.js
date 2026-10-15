import { createAsyncReducer } from "../../Helpers/AsyncReducerHelper";
import { SERVICES } from "../../Helpers/Type";

export const saveServiceReducer = createAsyncReducer(SERVICES.SAVE);
export const deleteServiceReducer = createAsyncReducer(SERVICES.DELETE);
export const listServicesReducer = createAsyncReducer(SERVICES.LIST);
