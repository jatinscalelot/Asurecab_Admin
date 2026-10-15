import { createAsyncAction } from "../../Helpers/AsyncActionHelper";
import * as services from "../../../Services/services";
import { TESTIMONIALS } from "../../Helpers/Type";

export const saveTestimonial = createAsyncAction(services.saveTestimonial, TESTIMONIALS.SAVE);
export const deleteTestimonial = createAsyncAction(services.deleteTestimonial, TESTIMONIALS.DELETE);
export const listTestimonials = createAsyncAction(services.listTestimonials, TESTIMONIALS.LIST);
