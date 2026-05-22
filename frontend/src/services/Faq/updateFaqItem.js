import { apiClient } from "../apiClient.js";

export async function updateFaqItem(item) {
    const response = await apiClient.put('/tables/FAQ', item);
    return response.data;
}
