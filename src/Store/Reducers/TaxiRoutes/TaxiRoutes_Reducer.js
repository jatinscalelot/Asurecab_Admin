import { createAsyncReducer } from "../../Helpers/AsyncReducerHelper";
import { TAXIROUTES } from "../../Helpers/Type";

export const saveTaxiRouteReducer = createAsyncReducer(TAXIROUTES.SAVE);
export const deleteTaxiRouteReducer = createAsyncReducer(TAXIROUTES.DELETE);
export const listTaxiRoutesReducer = createAsyncReducer(TAXIROUTES.LIST);
