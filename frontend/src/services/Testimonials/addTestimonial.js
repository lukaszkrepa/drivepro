import { apiClient } from "../apiClient.js";

export async function addTestimonial(item) {
    const newItem = {
        ...item,
        rating: Number(item.rating),
    };

    const response = await apiClient.post('/tables/Testimonials', newItem);
    return response.data;
}
