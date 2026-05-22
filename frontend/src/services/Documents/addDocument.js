import { apiClient } from "../apiClient.js";

export async function addDocument(item) {
    const response = await apiClient.post('/tables/documents', item);
    return response.data;
}
