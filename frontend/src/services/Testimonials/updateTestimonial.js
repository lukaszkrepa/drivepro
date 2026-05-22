import { apiClient } from "../apiClient.js";

export async function updateTestimonial(item) {
    const response = await apiClient.put('/tables/Testimonials', item);
    return response.data;
}
