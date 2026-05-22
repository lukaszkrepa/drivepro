import { apiClient } from "../apiClient.js";

export async function updateDocument(item) {
    const response = await apiClient.put('/tables/documents', item);
    return response.data;
}
