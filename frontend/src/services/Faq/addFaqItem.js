import { apiClient } from "../apiClient.js";

export async function addFaqItem(item) {
    const newItem = {
        ...item,
        list: item.list || [],
    };

    const response = await apiClient.post('/tables/FAQ', newItem);
    return response.data;
}
