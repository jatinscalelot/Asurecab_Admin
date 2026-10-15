import { createAsyncReducer } from "../../Helpers/AsyncReducerHelper";
import { TESTIMONIALS } from "../../Helpers/Type";

export const saveTestimonialReducer = createAsyncReducer(TESTIMONIALS.SAVE);
export const deleteTestimonialReducer = createAsyncReducer(TESTIMONIALS.DELETE);
export const listTestimonialsReducer = createAsyncReducer(TESTIMONIALS.LIST);
