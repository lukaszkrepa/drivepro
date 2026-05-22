import { apiClient } from "../apiClient.js";

export async function deleteTestimonial(id) {
    const response = await apiClient.del('/tables/Testimonials', { id });
    return response.data;
}
