import { apiClient } from "../apiClient.js";

export async function deleteFaqItem(id) {
    const response = await apiClient.del('/tables/FAQ', { id });
    return response.data;
}
