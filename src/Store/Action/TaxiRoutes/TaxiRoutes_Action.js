import { createAsyncAction } from "../../Helpers/AsyncActionHelper";
import * as services from "../../../Services/services";
import { TAXIROUTES } from "../../Helpers/Type";

export const saveTaxiRoute = createAsyncAction(services.saveTaxiRoute, TAXIROUTES.SAVE);
export const deleteTaxiRoute = createAsyncAction(services.deleteTaxiRoute, TAXIROUTES.DELETE);
export const listTaxiRoutes = createAsyncAction(services.listTaxiRoutes, TAXIROUTES.LIST);
