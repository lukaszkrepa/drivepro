import { apiClient } from "../apiClient.js";

export async function fetchTestimonials() {
    const response = await apiClient.get('/tables/Testimonials');
    return response.data;
}
